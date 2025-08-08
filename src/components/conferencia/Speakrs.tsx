import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const ConferenceSpeakers = () => {
    const speakers = [
        {
            name: "Embaixadora Dulce Gomes",
            title: "Cônsul Geral da República de Angola no Porto",
            expertise: "Diplomacia Internacional",
            image: '/speakers/consu.jpg'
        },
        {
            name: "Dr. Bruno Gutman",
            title: "Inscrito na Ordem dos Advogados no Brasil e em Portugal. Com mais de 20 anos de experiência internacional",
            expertise: "Advogado luso-brasileiro",
            image: '/speakers/bruno.jpg'
        },
        {
            name: "Dra. Catarina Zuccaro",
            title: " com 25 anos de experiência, Mestre em Direitos Humanos e Direito Internacional. Palestrante internacional em temas ligados à justiça global, mobilidade humana e liderança feminina. ",
            expertise: "Advogada Internacional ",
            image: '/speakers/Catarina.jpg'
        },
        {
            name: "Dra. Elvira Venâncio",
            title: "Área do direito- Ciências jurídico-empresariais( Direito Empresarial) - 3 anos de experiência Direitos Humanos e Migratório",
            expertise: "Jurista",
            image: '/speakers/Elvira.jpg'
        },
        {
            name: "Dra. Honorinda Manuel",
            title: "Especialista em Regularização de imigrantes e Direito Laboral.",
            expertise: "Jurista",
            image: '/speakers/Honorinda.jpg'
        }
    ];

    return (
        <div className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-base  mb-4 font-normal- text-black block  mx-auto">
                        Em celebração aos 50 anos de independência de Angola, a LAP e o Consulado Geral de Angola no Porto promovem uma conferência única sobre os Direitos dos Imigrantes.
                        Junte-se a nós nessa reflexão!
                    </span>
                    <h4 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Vozes que Inspiram
                    </h4>
                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Conheça especialistas em direito migratório e direitos humanos que trarão perspectivas poderosas e soluções práticas para os desafios dos imigrantes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {speakers.map((speaker, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm cursor-pointer">
                            <CardContent className="p-6">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-conference-orange to-conference-orange-light rounded-full flex items-center justify-center">
                                    <Image src={speaker.image} alt={speaker.name} width={100} height={80} className="rounded-full object-cover" />
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