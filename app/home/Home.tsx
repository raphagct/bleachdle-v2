import { Button } from "@/components/ui/button";

export default function Home() {
    return <div>
        <div className="flex flex-col items-center mt-12 mb-8 gap-2">
            <h1 className="text-5xl font-black tracking-tight text-primary">BLEACHDLE</h1>
            <h2 className="text-xl text-muted-foreground font-medium">Devine les personnages de BLEACH</h2>
        </div>
        <div className="flex flex-col items-center gap-4 mt-6">
            <Button size="xxl" className="w-64">Characters</Button>
            <Button size="xxl" className="w-64">Bankai</Button>
            <Button size="xxl" className="w-64">Citations</Button>
            <Button size="xxl" className="w-64">Techniques</Button>
        </div>
    </div>
}