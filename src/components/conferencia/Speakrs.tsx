import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User2Icon } from "lucide-react";

const ConferenceSpeakers = () => {
    const speakers = [
        {
            name: "Embaixadora Dulce Gomes",
            title: "Cônsul Geral da República de Angola no Porto",
            expertise: "Diplomacia Internacional"
        },
        {
            name: "Dra. Catarina Zuccaro",
            title: "Advogada Especialista em Direito Migratório",
            expertise: "Direito Migratório"
        },
        {
            name: "Dra. Elvira Venâncio",
            title: "Jurista",
            expertise: "Direitos Humanos"
        },
        {
            name: "Dra. Honorinda Manuel",
            title: "Jurista",
            expertise: "Direito Constitucional"
        }
    ];

    return (
        <div className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Palestrantes Convidados
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Especialistas renomados em direito migratório e direitos humanos partilharão os seus conhecimentos
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {speakers.map((speaker, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm cursor-pointer"> 
                            <CardContent className="p-6">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-conference-orange to-conference-orange-light rounded-full flex items-center justify-center">
                                    <User2Icon size={40} className="absolute"  color="#000"/>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-primary">
                                    {speaker.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {speaker.title}
                                </p>
                                <Badge variant="secondary" className="bg-conference-orange/10 text-conference-navy border-conference-orange/20">
                                    {speaker.expertise}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConferenceSpeakers;