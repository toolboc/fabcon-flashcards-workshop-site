'use client';

import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import ReactCardFlip from 'react-card-flip';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

const getGradient = (topic: string): string => {
  const gradients: { [key: string]: string } = {
    "introduction-end-analytics-use-microsoft-fabric": "bg-gradient-to-t from-teal-200 to-teal-700",
    "use-data-factory-pipelines-fabric": "bg-gradient-to-t from-yellow-300 to-green-800",
    "use-apache-spark-work-files-lakehouse": "bg-gradient-to-t from-yellow-500 to-red-500",
    "get-started-data-warehouse": "bg-gradient-to-t from-blue-800 to-blue-400",
    "use-dataflow-gen-2-fabric": "bg-gradient-to-t from-lime-300 to-green-700",
    "work-delta-lake-tables-fabric": "bg-gradient-to-t from-green-500 to-blue-500",
    "explore-event-streams-microsoft-fabric": "bg-gradient-to-t from-sky-800 to-blue-800",
    "administer-fabric": "bg-gradient-to-t from-gray-400 to-black",
    "ingest-data-with-spark-fabric-notebooks": "bg-gradient-to-t from-slate-300 to-green-800",
    "get-started-lakehouses": "bg-gradient-to-t from-sky-200 to-sky-700",
    "describe-medallion-architecture": "bg-gradient-to-t from-yellow-500 to-teal-500",
    "get-started-kusto-fabric": "bg-gradient-to-t from-teal-600 to-blue-800",
    "query-data-warehouse-microsoft-fabric": "bg-gradient-to-t from-teal-600 to-blue-800",
    "monitor-fabric-data-warehouse": "bg-gradient-to-t from-teal-200 to-teal-700",
    "load-data-into-microsoft-fabric-data-warehouse": "bg-gradient-to-t from-yellow-300 to-green-800",
    "query-data-kql-database-microsoft-fabric": "bg-gradient-to-t from-yellow-500 to-red-500",
    "train-track-model-fabric": "bg-gradient-to-t from-blue-800 to-blue-400",
    "preprocess-data-with-data-wrangler-microsoft-fabric": "bg-gradient-to-t from-blue-800 to-blue-400",
    "get-started-data-science-fabric": "bg-gradient-to-t from-lime-300 to-green-700",
    "generate-batch-predictions-fabric": "bg-gradient-to-t from-green-500 to-blue-500",
    "get-started-sql-database-microsoft-fabric": "bg-gradient-to-t from-sky-800 to-blue-800",
    "get-started-with-graphql-microsoft-fabric": "bg-gradient-to-t from-gray-400 to-black",
    "secure-data-access-in-fabric": "bg-gradient-to-t from-slate-300 to-green-800",
    "secure-data-warehouse-in-microsoft-fabric": "bg-gradient-to-t from-sky-200 to-sky-700",
    "monitor-fabric-items": "bg-gradient-to-t from-yellow-500 to-teal-500",
    "fabric-data-governance-purview": "bg-gradient-to-t from-teal-600 to-blue-800",
    "create-manage-power-bi-assets": "bg-gradient-to-t from-teal-200 to-teal-700",
    "design-scalable-semantic-models": "bg-gradient-to-t from-yellow-300 to-green-800",
    "enforce-power-bi-model-security": "bg-gradient-to-t from-yellow-500 to-red-500",
    "implement-cicd-in-fabric": "bg-gradient-to-t from-blue-800 to-blue-400"
  }

  return gradients[topic] || "bg-gradient-to-t from-blue-800 to-blue-400";
}

const getCardTitle = (topic: string): string => {
  const cardTitles: { [key: string]: string } = {
    "introduction-end-analytics-use-microsoft-fabric": "Fabric",
    "get-started-lakehouses": "Lakehouse",
    "use-apache-spark-work-files-lakehouse": "Data Engineering",
    "work-delta-lake-tables-fabric": "Delta Lake",
    "use-data-factory-pipelines-fabric": "Data Factory",
    "use-dataflow-gen-2-fabric": "Dataflow Gen2",
    "get-started-data-warehouse": "Data Warehouse",
    "administer-fabric": "Fabric Administration",
    "describe-medallion-architecture": "Medallion Architecture",
    "ingest-data-with-spark-fabric-notebooks": "Fabric Notebooks",
    "get-started-kusto-fabric": "Real-Time Intelligence",
    "explore-event-streams-microsoft-fabric": "Eventstream",
  }

  return cardTitles[topic] || "Flashcard";
}

export function FlashCard({QandAs, topic, moduleTitle}: {QandAs: any, topic: string, moduleTitle: string}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentQA, setCurrentQA] = useState(0)

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function flipToShowQuestion() {
    setIsFlipped(false)
  }

  async function nextCard() {
    const index = currentQA
    const nextIndex = (index + 1) % QandAs[topic].length
    flipToShowQuestion()
    await delay(200);
    setCurrentQA(nextIndex)
  }

  async function previousCard() {
    const index = currentQA
    const previousIndex = (index - 1 + QandAs[topic].length) % QandAs[topic].length
    flipToShowQuestion()
    await delay(200);
    setCurrentQA(previousIndex)
  }

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // Sample Link: https://learn.microsoft.com/training/modules/ingest-data-with-spark-fabric-notebooks/
  function createLearnLink(unit: string) {
    return "https://learn.microsoft.com/training/modules/" + topic + "/" + unit + "?WT.mc_id=data-111905-alvidela";
  }

  if (QandAs === undefined || QandAs === null || QandAs[topic] === undefined || QandAs[topic] === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-96 rounded-xl shadow-md overflow-hidden m-4 text-white bg-gradient-to-t from-red-500 to-red-700">
          <h1 className="text-lg m-5 uppercase">Still Loading Questions</h1>
        </Card>
      </div>
    )
  } else {
    const QAs = QandAs[topic]
  
    return (
      <div id="flashcard" className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <Card className={`w-96 rounded-xl shadow-md overflow-hidden m-4 text-white ${getGradient(topic)}`}>
          <h1 className="text-lg m-5 uppercase">{getCardTitle(topic)}</h1>
          <ReactCardFlip isFlipped={isFlipped}>
            <div className="react-card-front">
              <div className="pb-8">
                <CardHeader>
                  <CardTitle>Question:</CardTitle>
                </CardHeader>
                <CardContent className="text-xl h-44 overflow-auto">{QAs[currentQA].Q}</CardContent>
                <Button className="mt-4 ml-6 border-white bg-indigo-500" variant="outline" onClick={flipCard}>
                  Show Answer
                </Button>
              </div>
            </div>
            <div className="react-card-back">
              <div className="pb-8">
                <CardHeader>
                  <CardTitle>Answer:</CardTitle>
                </CardHeader>
                <CardContent className="text-base h-44 overflow-auto">
                  {QAs[currentQA].A}
                </CardContent>
                <Button className="mt-4 ml-6 mr-6 bg-indigo-500 text-white border-white" variant="outline" onClick={flipCard}>
                  Hide Answer
                </Button>
                <span className="className=mt-4 rounded-md p-2 bg-indigo-500 text-white border-white">
                <Link
                    href={createLearnLink(QAs[currentQA].source)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >Learn more</Link>
                </span>
              </div>
            </div>
          </ReactCardFlip>
          <CardFooter className="flex justify-between p-4 bg-[#9ee0cb]">
            <Button className="bg-[#117865] text-white border-[#8B4513]" onClick={previousCard}>
              Previous
            </Button>
            <Button className="bg-[#117865] text-white" onClick={nextCard}>Next</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}
