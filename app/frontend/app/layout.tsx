import type { Metadata } from "next";
import { Providers } from "./providers/Providers";

export const metadata: Metadata = {
    title: "Learn.ai",
    description: "Learn now.",
};

export default function RootLayout({ children }:
    Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}