"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { DotIcon } from "lucide-react";
import Link from "next/link";
import Stepper from "../shared/Stepper";

const MODES = [
    { name: "Classic", href: "/classic" },
    { name: "Bankai", href: "/bankai" },
    { name: "Citations", href: "/quotes" },
    { name: "Techniques", href: "/techniques" }
];

export function ModeHeader() {
    const pathname = usePathname();

    return (
        <div className="mb-8">
            <div className="flex flex-col items-center mt-4 mb-8 gap-2">
                <h1 className="text-5xl font-black tracking-tight text-primary"
                ><Link href={"/"}>BLEACHDLE</Link>
                </h1>
            </div>
            <Stepper/>
        </div>
    );
}
