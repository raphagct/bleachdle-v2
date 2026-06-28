import { ActivityIcon } from "@/components/icons/lucide-activity";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";

export default function CharactersModePage() {
    return <div className="px-4">
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Devinez le personnage de Bleach du jour</CardTitle>
            </CardHeader>
            <CardContent>
                <Hints
                    hint1={{ icon: <ActivityIcon />, description: "Indice de l'état vital dans" }}
                    hint2={{ icon: <ActivityIcon />, description: "Indice de l'état vital dans" }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
    </div>
}