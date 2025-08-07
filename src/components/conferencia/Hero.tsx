import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ConferenceHero() {
    return (
        <div className="relative overflow-hidden bg-[var(--gradient-hero)] text-foreground py-2 lg:py-10">
            {/* Decorative blob shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--conference-orange)] opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--conference-orange)] opacity-15 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    {/* LAP Logo placeholder */}
                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto bg-[var(--color-card)]/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Image src={'/torneio/lap_red.png'} alt="Lap logo" width={150} height={20}/>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        CONFERÊNCIA<br />
                        <span className="text-[var(--conference-orange)]">DIREITOS DOS IMIGRANTES</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6 text-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[var(--conference-orange)]" />
                            <span>13/08/2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[var(--conference-orange)]" />
                            <span>19h00 - 21h00</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[var(--conference-orange)]" />
                            <span>Porto</span>
                        </div>
                    </div>
                </div>

                <Card className="bg-[var(--color-card)]/10 backdrop-blur-sm border-none max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl text-[var(--conference-orange)]">Local</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg text-[var(--color-card-foreground)]">
                            Conservatório de Música do Porto<br />
                            Praça de Pedro Nunes, 4050-466 Porto
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}