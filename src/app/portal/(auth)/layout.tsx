import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function PortalAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cplp-bg px-4">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/brand/png/cplpconnect-lockup-h.png"
                        alt="CPLP CONNECT"
                        width={150}
                        height={52}
                        className="h-9 w-auto"
                        priority
                    />
                </div>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-8">{children}</CardContent>
                </Card>
            </div>
        </div>
    );
}
