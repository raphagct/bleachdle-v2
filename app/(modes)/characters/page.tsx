"use client";

import { Activity, EyeOff } from "lucide-react";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useState } from "react"


export default function CharactersModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);


    return <div className="px-4">
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Devinez le personnage de Bleach du jour</CardTitle>
            </CardHeader>
            <CardContent>
                <Hints
                    hint1={{
                        icon: <Activity />,
                        description: "Indice de l'état vital dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <EyeOff />,
                        description: "Indice du personnage flouté dans " + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
    </div>
}