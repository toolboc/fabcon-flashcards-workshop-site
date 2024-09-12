'use client';

import Image from 'next/image'
import { FlashCard } from '@/components/flash-card'
import { Topic } from '@/components/topic'
import { useState } from "react"

import generatedQAs from '@/generated-QAs.json';
import jsonTopics from '@/topics.json';
// console.log(myData);

export default function Home() {
  const topics = jsonTopics
  const QAs = generatedQAs

  // some defaults
  const [topic, onTopicChange] = useState("get-started-lakehouses")
  const [moduleTitle, onModuleTitleChange] = useState("Get started with lakehouses in Microsoft Fabric")

  return (
     <div className="p-4">
     <h1 className="text-6xl font-bold mb-4 text-center dark:text-white">Fabric Flashcards</h1>
     <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Select a topic to get started</h2>
      <Topic topics={topics} onTopicChange={onTopicChange} onModuleTitleChange={onModuleTitleChange} />
      <FlashCard QandAs={QAs} topic={topic} moduleTitle={moduleTitle}/>
     </div>
  )
}
