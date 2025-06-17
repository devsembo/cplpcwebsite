'use client';
import React, { useEffect, } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Head from 'next/head';
import { AxiosError } from "axios";
import { api } from '@/services/api';
import { toast } from 'sonner';

const formSchema = z.object({
    nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    telemovel: z.string().regex(/^9\d{8}$/, 'Insira um número válido (9xxxxxxxx)'),
    email: z.string().email('Insira um e-mail válido'),
    distrito: z.string().min(1, 'O distrito é obrigatório'),
    nomeLider: z.string().optional(),
    telemovelLider: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function FormularioTorneio() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
            telemovel: '',
            email: '',
            distrito: '',
            nomeLider: '',
            telemovelLider: ''
        }
    });

    const distritoSelecionado = useWatch({ control, name: 'distrito' });

    const distritos = ['Aveiro', 'Aveiro - AEA', 'Braga', 'Bragança', 'Coimbra', 'Vila Real'];

    const lideres = [
        {
            nome: 'Afonso da Silva',
            telemovel: '935163201',
            distrito: 'Coimbra'
        },
        {
            nome: 'Jordi Mucuta',
            telemovel: '933494325',
            distrito: 'Vila Real'
        },
        {
            nome: 'Francisco Cassandra',
            telemovel: '928043384',
            distrito: 'Aveiro'
        },
        {
            nome: 'Domingas Silva',
            telemovel: '920449002',
            distrito: 'Aveiro - AEA'
        },
        {
            nome: 'Lírio Francisco',
            telemovel: '932234194',
            distrito: 'Braga'
        },
        {
            nome: 'SALOMÃO FERREIRA',
            telemovel: '925618998',
            distrito: 'Bragança'
        }
    ];

    const imagensCarrossel = [
        '/torneio/capa.jpg',
        '/torneio/grupos.jpg',
        '/torneio/fase-grupos.jpg',
        '/torneio/3º-lugar.jpg',
        '/torneio/meia-final.jpg',
        '/torneio/final.jpg',
    ];

    useEffect(() => {
        if (distritoSelecionado) {
            const lider = lideres.find((l) => l.distrito === distritoSelecionado);
            if (lider) {
                setValue('nomeLider', lider.nome);
                setValue('telemovelLider', lider.telemovel);
            } else {
                setValue('nomeLider', '');
                setValue('telemovelLider', '');
            }
        }
    }, [distritoSelecionado, setValue]);

    const onSubmit = async (data: FormValues) => {
        const apiClient = api;

        try {
            await apiClient.post('/api/torneio', {
                nome: data.nome,
                telemovel: data.telemovel,
                email: data.email,
                distrito: data.distrito,
                nomeLider: data.nomeLider,
                telemovelLider: data.telemovelLider
            });

            toast.success("Dados enviados com sucesso!", {
                duration: 3000,
                description: <span style={{ color: "#fff" }}>Seu apoio é muito importante para nós.</span>,
                style: {
                    backgroundColor: "green",
                    color: "#fff",
                },
            });

            reset();
        } catch (error: unknown) {
            let customMessage = 'Erro inesperado ao enviar os dados.';

            if (error && typeof error === 'object' && 'isAxiosError' in error) {
                const axiosError = error as AxiosError<{ error: string }>;
                customMessage = axiosError.response?.data?.error ?? customMessage;
            }

            toast.error(customMessage, {
                style: {
                    backgroundColor: "#a02828",
                    color: "#fff",
                },
            });
        }
    };


    return (
        <>
            <Head>
                <title>Formulário de Inscrição no Torneio</title>
                <meta name="description" content="Formulario de participação e apoio a nossa seleção" />
            </Head>
            <div className="container mx-auto p-4 max-w-2xl">

                {/* Carrossel */}
                <Carousel className="mb-8">
                    <CarouselContent>
                        {imagensCarrossel.map((imagem, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={imagem}
                                    alt={`Imagem do torneio ${index + 1}`}
                                    className="w-full h-96 object-cover rounded-lg"
                                    width={800}
                                    height={400}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="text-center mb-6 flex">
                    <Image
                        src={"/torneio/lap_blue.png"}
                        alt="CPLP Connect Logo"
                        width={100}
                        height={40}
                        className="mb-4 mx-auto"
                    />
                    <Image
                        src={"/cplp-logo.png"}
                        alt="CPLP Connect Logo"
                        width={100}
                        height={40}
                        className="mb-4 mx-auto"
                    />
                </div>
                <p>A LAP EM PARCERIA COM A CPLP CONNECT</p>
                <p className='text-justify mb-5'>
                    Criam este  formulário para todos os cidadãos angolanos que desejam apoiar a nossa seleção nacional, para os distritos disponíveis no formalário. <br /> Ao preencher este formulário, você estará contribuindo para o fortalecimento do nosso espírito esportivo e união nacional.
                    <br />
                    <br />
                    <strong>Nota:</strong><span className='text-sm'> As informações fornecidas serão utilizadas exclusivamente para fins de organização do torneio e apoio à seleção. Agradecemos o seu interesse e participação!</span>
                </p>
                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <Input id="nome" {...register('nome')} className="mt-1" />
                        {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
                    </div>

                    {/* Telemóvel */}
                    <div>
                        <label htmlFor="telemovel" className="block text-sm font-medium text-gray-700">
                            Número de Telemóvel
                        </label>
                        <Input id="telemovel" type="tel" {...register('telemovel')} className="mt-1" />
                        {errors.telemovel && <p className="mt-1 text-sm text-red-600">{errors.telemovel.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <Input id="email" type="email" {...register('email')} className="mt-1" />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Distrito */}
                    <div>
                        <label htmlFor="distrito" className="block text-sm font-medium text-gray-700">
                            Distrito
                        </label>
                        <Controller
                            name="distrito"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Selecione o distrito" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {distritos.map((distrito) => (
                                            <SelectItem key={distrito} value={distrito}>
                                                {distrito}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.distrito && <p className="mt-1 text-sm text-red-600">{errors.distrito.message}</p>}
                    </div>

                    {/* Nome do Líder */}
                    <div>
                        <label htmlFor="nomeLider" className="block text-sm font-medium text-gray-700">
                            Nome do Líder
                        </label>
                        <Input id="nomeLider" {...register('nomeLider')} disabled className="mt-1 bg-gray-100" />
                    </div>

                    {/* Telemóvel do Líder */}
                    <div>
                        <label htmlFor="telemovelLider" className="block text-sm font-medium text-gray-700">
                            Telemóvel do Líder
                        </label>
                        <Input id="telemovelLider" {...register('telemovelLider')} disabled className="mt-1 bg-gray-100" />
                    </div>

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Enviando...
                            </span>
                        ) : (
                            'Submeter'
                        )}
                    </Button>
                </form>
            </div>
        </>
    );
}
