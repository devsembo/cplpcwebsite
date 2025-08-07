import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { User, Mail, Phone, Building, Users } from "lucide-react";
import { api } from "@/services/api";
import { Controller } from "react-hook-form";

const formSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Apelido é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Telefone inválido"),
    organization: z.string().optional(),
    position: z.string().optional(),
    expectations: z.string().optional(),
    consent: z.boolean().refine(val => val === true, "Consentimento é obrigatório"),
    newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ConferenceForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organization: "",
            position: "",
            expectations: "",
            consent: false,
            newsletter: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            await api.post('/api/conference/registration', data);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            toast.success("Inscrição realizada com sucesso!");
        } catch (error) {
            toast.error("Erro ao realizar inscrição. Tente novamente.");
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-16 bg-[var(--gradient-hero)] text-[var(--color-foreground)]">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="shadow-xl border-none bg-[var(--color-card)]/10 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold text-[var(--conference-orange)]">
                                Inscrição na Conferência
                            </CardTitle>
                            <CardDescription className="text-lg text-[var(--color-muted-foreground)]">
                                Preencha o formulário para participar na conferência sobre direitos dos imigrantes
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-[var(--conference-orange)] flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Dados Pessoais
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nome *</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="Seu nome"
                                                {...register("firstName")}
                                                className="bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                            />
                                            {errors.firstName && (
                                                <p className="text-sm text-[var(--color-destructive)]">{errors.firstName.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apelido *</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Seu apelido"
                                                {...register("lastName")}
                                                className="bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                            />
                                            {errors.lastName && (
                                                <p className="text-sm text-[var(--color-destructive)]">{errors.lastName.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--conference-orange)]" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="seu.email@exemplo.com"
                                                {...register("email")}
                                                className="pl-10 bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-[var(--color-destructive)]">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefone *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-4 h-4 text-[var(--conference-orange)]" />
                                            <Input
                                                id="phone"
                                                placeholder="+351 912 345 678"
                                                {...register("phone")}
                                                className="pl-10 bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-[var(--color-destructive)]">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-[var(--conference-orange)] flex items-center gap-2">
                                        <Building className="w-5 h-5" />
                                        Informações Profissionais
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organização/Empresa</Label>
                                        <Input
                                            id="organization"
                                            placeholder="Nome da sua organização"
                                            {...register("organization")}
                                            className="bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">Cargo/Função</Label>
                                        <Input
                                            id="position"
                                            placeholder="Seu cargo ou função"
                                            {...register("position")}
                                            className="bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                        />
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-[var(--conference-orange)] flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Informações Adicionais
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="expectations">Expectativas para a Conferência</Label>
                                        <Textarea
                                            id="expectations"
                                            placeholder="O que espera aprender ou discutir nesta conferência?"
                                            {...register("expectations")}
                                            className="min-h-[100px] bg-[var(--color-card)]/5 border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                                        />
                                    </div>
                                </div>

                                {/* Consent */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            name="consent"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    id="consent"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            )}
                                        />

                                        <Label htmlFor="consent" className="text-sm text-[var(--color-muted-foreground)]">
                                            Concordo com o tratamento dos meus dados pessoais para fins de organização do evento *
                                        </Label>
                                    </div>
                                    {errors.consent && (
                                        <p className="text-sm text-[var(--color-destructive)]">{errors.consent.message}</p>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="newsletter" {...register("newsletter")} />
                                        <Label htmlFor="newsletter" className="text-sm text-[var(--color-muted-foreground)]">
                                            Desejo receber informações sobre futuros eventos relacionados
                                        </Label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full font-semibold py-3 px-6 rounded-[var(--radius-lg)] transition-all duration-300 transform hover:scale-105 shadow-[var(--shadow-conference)] cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "A processar..." : "Confirmar Inscrição"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}