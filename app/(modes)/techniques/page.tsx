"use client";

import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { techniques, type Technique } from "@/lib/techniques.data";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function TechniquesModePage() {
    const [randomTechnique, setRandomTechnique] = useState<Technique | null>(null)
    const [showColors, setShowColors] = useState(true)
    const [progressiveUnblur, setProgressiveUnblur] = useState(true)

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * techniques.length)
        setRandomTechnique(techniques[randomIndex])
    }, [])

    return <div className="px-4">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Quel personnage exécute cette technique ?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {randomTechnique && (
                    <Image
                        className={cn(
                            "blur-md transition-all duration-300",
                            !showColors && "grayscale"
                        )}
                        src={randomTechnique.gif_url}
                        alt="solution du jour"
                        width={360}
                        height={360}
                        style={{ padding: "1rem", objectFit: "contain" }}
                    />
                )}
                <div className="flex justify-center gap-8 w-full">
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="show-colors" checked={showColors} onCheckedChange={setShowColors} />
                        <Label htmlFor="show-colors" className="text-xs text-muted-foreground text-center">Afficher les couleurs</Label>
                    </div>
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="unblur" checked={progressiveUnblur} onCheckedChange={setProgressiveUnblur} />
                        <Label htmlFor="unblur" className="text-xs text-muted-foreground text-center">Chaque essai rend l'image un peu moins floue</Label>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
    </div>
}