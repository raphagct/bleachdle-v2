"use client";

import { ActivityIcon } from "@/components/icons/lucide-activity";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useState } from "react"

export default function QuotesModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);

    return <div className="px-4">
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Quel personnage a prononce cette citation ?</CardTitle>
            </CardHeader>
            <CardContent>
                <blockquote className="my-8 border-l-4 border-primary pl-6 py-2">
                    <p className="text-2xl font-serif italic text-foreground leading-relaxed">
                        "C'est quoi un cœur ? Si je t'ouvre la poitrine,
                        est-ce que je le verrai à l'intérieur ?
                        Si je te fracasse le crâne, est-ce qu'il sera là ?"
                    </p>
                </blockquote>
                <Hints
                    hint1={{
                        icon: <ActivityIcon />,
                        description: "Indice de l'état vital dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <ActivityIcon />,
                        description: "Indice de l'état vital dans " + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
    </div>
}