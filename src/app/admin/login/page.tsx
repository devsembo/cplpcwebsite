import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
    title: "Admin — CPLP CONNECT",
    robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
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
                    <CardContent className="p-8">
                        <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">
                            Acesso à Administração
                        </h1>
                        <LoginForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
