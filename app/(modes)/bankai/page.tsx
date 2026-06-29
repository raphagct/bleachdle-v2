"use client";

import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Languages, Shield } from "lucide-react";
import { useState } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";

export default function BankaiModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);

    return <div className="px-4">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>À qui appartient ce bankai ?</CardTitle>
            </CardHeader>
            <CardContent>
                <blockquote className="mb-4 border-l-4 border-primary pl-6 py-2">
                    <p className="text-xl font-serif italic text-foreground leading-relaxed">
                        "Katen Kyōkotsu - Karamatsu Shinjū"
                    </p>
                </blockquote>
                <Hints
                    hint1={{
                        icon: <Shield />,
                        description: "Indice du rang de l'utilisateur dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <Languages />,
                        description: "Indice du bankai traduit dans" + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        <CharacterSearch/>
    </div>
}