import "./globals.css";
import { Inconsolata } from "next/font/google";
import { cn } from "@/lib/utils";

const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inconsolata.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}