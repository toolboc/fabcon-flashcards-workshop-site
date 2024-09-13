import requests
import os
import yaml
import json
from openai import AzureOpenAI

# learn module metadata URL
LEARN_GITHUB_BASE = "https://raw.githubusercontent.com/MicrosoftDocs/learn/main/learn-pr"
url = f"{LEARN_GITHUB_BASE}/wwl/get-started-lakehouses/index.yml"

# load module metadata
response = requests.get(url)
index_data = yaml.safe_load(response.content)

# print the module metadata
print(index_data)

# use the module uid to calculate the folder structure of the learn module
module_uid = index_data['uid']

module_units = index_data['units']

# convert the module uid to a path
uid_to_path = module_uid.replace(".", "/")

# Path to Lakehouse Files
LEARN_CACHE_PATH="./learn-files"

# Path to Markdown Files
MARKDOWN_PATH=f"{LEARN_CACHE_PATH}/markdown"

# Path to Learn Module
LEARN_MODULE_PATH=f"{MARKDOWN_PATH}/{uid_to_path}"

# create folder to store our Markdown files
os.makedirs(LEARN_MODULE_PATH, exist_ok=True)

# save the index.yml file to the Lakehouse
filename = url.rsplit("/")[-1]
with open(os.path.join(LEARN_MODULE_PATH, filename), "wb") as f:
    f.write(response.content)

# create folder for includes (Markdown file location)
INCLUDES_PATH=f"{LEARN_MODULE_PATH}/includes"
os.makedirs(INCLUDES_PATH, exist_ok=True)

# list to keep track of the files
file_list = []

i = 0
for u in module_units:
    i += 1
    
    # get the unit identifier (introduction, define-real-time-analytics, etc.)
    include = u.rsplit(".")[-1]

    # skip the summary, exercise, and knowledge-check units
    if include == "summary" or include == "exercise" or include == "knowledge-check":
        continue

    include_unit = f"{i}-{include}"
    
    # fetch module includes (the actual Markdown files)
    include_url = f"{LEARN_GITHUB_BASE}/wwl/get-started-lakehouses/includes/{include_unit}.md"
    print(include_url)
    include_response = requests.get(include_url)

    # File name is the last part of the URL
    include_filename = include_url.rsplit("/")[-1]
    markdown_file = os.path.join(INCLUDES_PATH, include_filename)

    # Save the file to the Lakehouse
    with open(markdown_file, "wb") as f:
        f.write(include_response.content)
    
    # keep track of the files
    file_list.append({"file": markdown_file, "source": include_unit})


######################
######################
######################
######################

deployment_name=AZURE_OPENAI_CHAT_DEPLOYMENT

client = AzureOpenAI(
    api_key=AZURE_OPENAI_API_KEY,
    azure_endpoint=AZURE_OPENAI_ENDPOINT
    api_version=AZURE_OPENAI_API_VERSION
)

class LearnAssistant:

    _openai = None
    _deployment_name = None

    def __init__(self, client, deployment_name):
        self.name = "Learn Assistant"
        self._openai = client
        self._deployment_name = deployment_name

    def generate_questions(self, text):
        system_message = """
        You are an assistant designed to help people learn from tutorials. 
        You will receive a Markdown document, and extract from it pairs of questions and answers that will help the reader learn about the text. 
        Questions and answers should be based on the input text.
        Extract at least 5 different pairs of questions and answers. Questions and answers should be short.
        Output should be valid JSON format.
        Here's an example of your output format: [{"Q": "What is the name of the assistant?", "A": "Learn Assistant"}]
        """
        user_message = text

        return self.call_openai(
            self._deployment_name, 
            system_message=system_message,
            user_message=user_message
        )
    
    def call_openai(self, deployment_name, system_message, user_message):
        response = self._openai.chat.completions.create(
            model=deployment_name,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )

        return response['choices'][0]['message']['content']

# object to keep track of the generated QAs
QAS = {}

# get the module name
module_name = module_uid.split(".")[-1]

for entry in file_list:
  file = entry["file"]
  source = entry["source"]
  with open(file, "r") as f:
      input_text = f.read()
      genQas = LearnAssistant(client, deployment_name).generate_questions(input_text)
      print(genQas)

      # convert the generated questions and answers to a list
      temp = json.loads(genQas)
      
      # add the module name and source URL to the QAs
      for t in temp:

        card = {
            "Q": t["Q"], 
            "A": t["A"],
            "source": source
        }

        if module_name not in QAS:
            QAS[module_name] = []
        
        QAS[module_name].append(card)
  
  
with open(f"{LEARN_CACHE_PATH}/generated-QAs.json", "w") as fp:
    json.dump(QAS , fp)

