'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LQdt33ttiDt
 */
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import Link from "next/link"
import { useCallback } from 'react'

export function Topic({topics, onTopicChange, onModuleTitleChange}: {topics: any[], onTopicChange: any, onModuleTitleChange: any}) {
    const alternatingColor = ['bg-[#c0ecdd]', 'bg-[#9ee0cb]'];

    const handleTopicChange = useCallback((event: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        event.preventDefault();
        onTopicChange(event.currentTarget.getAttribute('data-module'))
        onModuleTitleChange(event.currentTarget.getAttribute('data-title'))
        scrollToFlashcard()
    }, [onTopicChange, onModuleTitleChange])

    function scrollToFlashcard() {
        const element = document.getElementById("flashcard");
        element!.scrollIntoView({behavior: "smooth"});
    }

    // Sample Link: https://learn.microsoft.com/training/modules/ingest-data-with-spark-fabric-notebooks/
    function createLearnLink(module: string) {
        return "https://learn.microsoft.com/training/modules/" + module + "/" + "?WT.mc_id=data-111905-alvidela";
    }

    return (
    <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((el, idx) => (
            <Card className={alternatingColor[idx % alternatingColor.length]} key={idx}>
                <CardHeader>
                <CardTitle>{el.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                {el.summary}
                </CardContent>
                <CardFooter>
                <Link
                className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                href={createLearnLink(el.module)}
                rel="noopener noreferrer"
                target="_blank"
                >
                Go through the Learn Module
                </Link>
                <div style={{marginRight: '1em'}} />
                <Link
                className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                href="#"
                onClick={handleTopicChange}
                data-module={el.module}
                data-title={el.title}
                >
                Scroll to Flashcards
                </Link>
                </CardFooter>
            </Card>
        ))}
        </div>
    </div>
    )
}

