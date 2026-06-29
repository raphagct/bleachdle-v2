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

const MODES = [
    { name: "Characters", href: "/characters" },
    { name: "Bankai", href: "/bankai" },
    { name: "Quotes", href: "/quotes" },
    { name: "Techniques", href: "/techniques" }
];

export function ModeHeader() {
    const pathname = usePathname();

    return (
        <div className="mb-8">
            <div className="flex flex-col items-center mt-4 mb-8 gap-2">
                <h1 className="text-5xl font-black tracking-tight text-primary">BLEACHDLE</h1>
            </div>
            <Breadcrumb>
                <BreadcrumbList className="justify-center">
                    {MODES.map((mode, index) => {
                        const isActive = pathname === mode.href;
                        return (
                            <React.Fragment key={mode.href}>
                                <BreadcrumbItem>
                                    {isActive ? (
                                        <BreadcrumbPage>{mode.name}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={mode.href}>{mode.name}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < MODES.length - 1 && (
                                    <BreadcrumbSeparator>
                                        <DotIcon />
                                    </BreadcrumbSeparator>
                                )}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
