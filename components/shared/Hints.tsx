import { ReactNode} from "react"

interface HintData {
    icon: ReactNode,
    description: String
}

interface HintProps {
    hint1: HintData,
    hint2: HintData
}

export default function Hints({ hint1, hint2 }: HintProps) {
    return <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-4 text-center border-4 h-32 rounded-lg">
            <div className="[&>svg]:size-10 text-primary mb-2">
                {hint1.icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground leading-tight">
                {hint1.description}
            </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 text-center border-4 h-32 rounded-lg">
            <div className="[&>svg]:size-10 text-primary mb-2">
                {hint2.icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground leading-tight">
                {hint2.description}
            </span>
        </div>
    </div>
}