'use client';

import Image from 'next/image'
import { FlashCard } from '@/components/flash-card'
import { Topic } from '@/components/topic'
import { useState } from "react"
import { useEffect } from "react"

// const topicsURL = "https://fabconworkshopalvidela.blob.core.windows.net/$web/topics.json"
const topicsURL = "https://workshoptestst.blob.core.windows.net/$web/topics.json"
// const topicsURL = "https://raw.githubusercontent.com/videlalvaro/fabcon-flashcards-workshop-site/refs/heads/main/src/topics.json"
const QAsURL = "https://fabconworkshopalvidela.blob.core.windows.net/$web/generated-QAs.json"

// const QAsURL = "https://raw.githubusercontent.com/videlalvaro/fabcon-flashcards-workshop-site/refs/heads/main/src/generated-QAs.json"

const startingTopic = "get-started-lakehouses"
const startingModuleTitle = "Get started with lakehouses in Microsoft Fabric"

export default function Home() {
  const [topics, setTopics] = useState([])
  const [QAs, setGenQAs] = useState({})

  // some defaults
  const [topic, onTopicChange] = useState(startingTopic)
  const [moduleTitle, onModuleTitleChange] = useState(startingModuleTitle)

  useEffect(() => {
    fetch(topicsURL)
      .then(res => res.json())
      .then(data => setTopics(data))

    fetch(QAsURL)
      .then(res => res.json())
      .then(data => setGenQAs(data))
  }, [])

  return (
     <div className="p-4">
     <h1 className="text-6xl font-bold mb-4 text-center dark:text-white">Fabric Flashcards</h1>
     <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Select a topic to get started</h2>
      <Topic topics={topics} onTopicChange={onTopicChange} onModuleTitleChange={onModuleTitleChange} />
      <FlashCard QandAs={QAs} topic={topic} moduleTitle={moduleTitle} />
     </div>
  )
}
