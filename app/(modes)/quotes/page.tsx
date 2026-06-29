"use client";

import { User, BookOpen } from "lucide-react";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useState } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";

export default function QuotesModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);

    return <div className="px-4">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Quel personnage a prononcé cette citation ?</CardTitle>
            </CardHeader>
            <CardContent>
                <blockquote className="mb-4 border-l-4 border-primary pl-6 py-2">
                    <p className="text-xl font-serif italic text-foreground leading-relaxed">
                        "C'est quoi un cœur ? Si je t'ouvre la poitrine,
                        est-ce que je le verrai à l'intérieur ?
                        Si je te fracasse le crâne, est-ce qu'il sera là ?"
                    </p>
                </blockquote>
                <Hints
                    hint1={{
                        icon: <User />,
                        description: "Indice du destinataire dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <BookOpen />,
                        description: "Indice d'arc dans " + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        <CharacterSearch/>
    </div>
}