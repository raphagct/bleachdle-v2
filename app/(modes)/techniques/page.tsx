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

import bankaiPic from "../../../public/rukia-bankai.gif";
import Image from 'next/image';
import CharacterSearch from "@/components/shared/CharacterSearch";

export default function TechniquesModePage() {
    return <div className="px-4">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Quel personnage exécute cette technique ?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Image
                    className="blur-md "
                    src={bankaiPic}
                    alt="rukia bankai"
                    width={360}
                    height={360}
                    style={{ padding: "1rem", objectFit: "contain" }}
                />
                <div className="flex justify-center gap-8 w-full">
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="show-colors" checked size="lg" />
                        <Label htmlFor="show-colors" className="text-xs text-muted-foreground text-center">Afficher les couleurs</Label>
                    </div>
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="unblur" checked size="lg" />
                        <Label htmlFor="unblur" className="text-xs text-muted-foreground text-center">Chaque essai rend l'image un peu moins floue</Label>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        <CharacterSearch/>
    </div>
}