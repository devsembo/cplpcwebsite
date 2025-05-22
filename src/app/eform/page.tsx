"use client";
import { useForm, } from "react-hook-form";
import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { enviarFeedback } from "@/services/api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const schema = z.object({
    nome: z.string().min(2, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    telemovel: z.string().min(2, "Telemóvel é obrigatório"),
    pais: z.string().min(2, "Informe o país"),
    consulado: z.string().min(2, "Selecione um consulado"),
    dificuldades: z.string().min(5, "Descreva suas dificuldades"),
    melhorias: z.string().min(5, "Sugestões de melhoria são importantes"),
});

type FormData = z.infer<typeof schema>;


const consulados: Record<string, string[]> = {
    Angola: ["Consulado de Lisboa", "Consulado do Porto"],
    Brasil: ["Consulado de Lisboa", "Consulado do Porto", "Consulado de Faro"],
    CaboVerde: ["Consulado de Lisboa", "Consulado do Mindelo"],
    GuineBissau: ["Consulado de Lisboa", "Consulado do Porto"],
    Mocambique: ["Consulado de Lisboa", "Consulado do Porto"],
    SaoTome: ["Consulado de Lisboa", "Consulado do Porto"],
    TimorLeste: ["Consulado de Lisboa", "Consulado do Porto"],
};


export default function FeedbackForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const paisSelecionado = watch("pais") as keyof typeof consulados;

    const onSubmit = async (data: FormData) => {
        try {
            await enviarFeedback(data);

            reset();
            toast.success("Obrigado pelo seu feedback!", {
                duration: 3000,
                description: (
                    <span style={{ color: "#ffcc00" }}>
                        Seu feedback é muito importante para nós.
                    </span>
                ),
                style: {
                    backgroundColor: "green",
                    color: "#fff",
                },
            });
            router.push("/");
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            const mensagem =
                axiosError.response?.data?.message || "Erro desconhecido. Tente novamente mais tarde.";

            toast.error("Ocorreu um erro ao enviar o feedback", {
                description: (
                    <span style={{ color: "#ffcc00" }}>{mensagem}</span>
                ),
                style: {
                    backgroundColor: "#531111",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <>

            <Head>
                <title>Questionário da Comunidade CPLP | CPLP CONNECT</title>
                <meta name="description" content="Ajude-nos a melhorar os serviços consulares respondendo ao nosso breve questionário. Sua opinião é muito importante." />
                <meta property="og:title" content="Questionário da Comunidade CPLP | CPLP CONNECT" />
                <meta property="og:description" content="Contribua com sugestões e opiniões para melhorar os serviços consulares." />
                <meta property="og:image" content="/cplp-comunity.png" />
                <meta property="og:url" content="https://cplpconnect.pt/eform" />
            </Head>
            <section
                className="relative bg-cover bg-center bg-no-repeat h-80 sm:h-[30vh] "
                style={{
                    backgroundImage: "url('/cplp-comunity.png')",
                }}
            >
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                    <div className="max-w-2xl text-center text-white px-4 sm:px-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                            Ajude-nos a melhorar os  serviços consulares dos países membro da cplp em Portugal
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                            Responda em 3 a 5 min um breve questionário sobre as suas dificuldades e sugestões de melhoria.
                            <br />
                            Isso nos ajudará a entender melhor as necessidades da comunidade CPLP e a melhorar os serviços.
                        </p>
                    </div>
                </div>
            </section>

            <div className=" py-20 px-4 sm:px-6 lg:px-8">
                <Card className="max-w-lg mx-auto border-0">
                    <CardHeader className="py-4">
                        <CardTitle className="text-2xl font-semibold text-gray-800">Dê seu feedback sobre o consulado em que está inscrito</CardTitle> {/* Aumenta o tamanho da fonte e usa uma cor de texto mais escura */}
                    </CardHeader>
                    <CardContent className="p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</Label> {/* Adiciona estilo ao label */}
                                <Input
                                    type="text"
                                    id="nome"
                                    {...register("nome")}
                                    placeholder="Digite seu nome"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" // Adiciona estilos de foco
                                />
                                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    placeholder="Digite seu e-mail"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="telemovel" className="block text-sm font-medium text-gray-700">Telemóvel</Label>
                                <Input
                                    type="telemoel"
                                    id="telemovel"
                                    {...register("telemovel")}
                                    placeholder="Digite o seu número de telemóvel"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="pais" className="block text-sm font-medium text-gray-700">Qual a sua nacionalidade ?</Label>
                                <Select onValueChange={(value: string) => setValue("pais", value)}>
                                    <SelectTrigger id="pais" className="w-full">
                                        <SelectValue placeholder="Selecione o seu país" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full"> {/* Ajusta a largura do SelectContent */}
                                        {Object.keys(consulados).map((pais) => (
                                            <SelectItem key={pais} value={pais}>
                                                {pais}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais.message}</p>}
                            </div>

                            {paisSelecionado && consulados[paisSelecionado] && (
                                <div>
                                    <Label htmlFor="consulado" className="block text-sm font-medium text-gray-700">Consulado</Label>
                                    <Select onValueChange={(value: string) => setValue("consulado", value)}>
                                        <SelectTrigger id="consulado" className="w-full">
                                            <SelectValue placeholder="Selecione o consulado" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {consulados[paisSelecionado].map((consulado) => (
                                                <SelectItem key={consulado} value={consulado}>
                                                    {consulado}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.consulado && <p className="text-red-500 text-sm mt-1">{errors.consulado.message}</p>}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="dificuldades" className="block text-sm font-medium text-gray-700">Quais são suas principais dificuldades?</Label>
                                <Textarea
                                    id="dificuldades"
                                    {...register("dificuldades")}
                                    placeholder="Descreva suas dificuldades: 
                                    Atendimento, agendamento, notificações, aviso para levantamento dos documentos, informções sobre comunicados. etc."
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.dificuldades && <p className="text-red-500 text-sm mt-1">{errors.dificuldades.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="melhorias" className="block text-sm font-medium text-gray-700">Sugestões de melhoria</Label>
                                <Textarea
                                    id="melhorias"
                                    {...register("melhorias")}
                                    placeholder="O que pode melhorar? sem filtros estamos aqui para ajudar"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.melhorias && <p className="text-red-500 text-sm mt-1">{errors.melhorias.message}</p>}
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Estilo para o botão */}
                                {isSubmitting ? "Enviando..." : "Enviar Feedback"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
