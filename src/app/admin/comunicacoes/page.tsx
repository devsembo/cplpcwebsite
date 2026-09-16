import { getNotifications, getCompanyOptions, getSessionOptions } from "@/lib/data/academy";
import { Card, CardContent } from "@/components/ui/card";
import ComposeForm from "./ComposeForm";

export default async function AdminComunicacoesPage() {
    const [notifications, companies, sessions] = await Promise.all([
        getNotifications(),
        getCompanyOptions(),
        getSessionOptions(),
    ]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-2">Comunicações</h1>
            <p className="text-sm text-cplp-grey mb-6">
                Envio real de email a formandos, turmas ou empresas clientes, com histórico.
            </p>

            <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                    <ComposeForm companies={companies} sessions={sessions.map((s) => ({ id: s.id, code: s.code }))} />
                </div>

                <Card className="border border-cplp-line bg-white shadow-none rounded-lg lg:col-span-3">
                    <CardContent className="p-6">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide mb-1">Histórico</p>
                        <h2 className="font-bold text-cplp-navy mb-4">Comunicações enviadas</h2>

                        {notifications.length === 0 ? (
                            <p className="text-sm text-cplp-grey py-8 text-center">Ainda não há comunicações enviadas.</p>
                        ) : (
                            <ul className="divide-y divide-cplp-line">
                                {notifications.map((n) => (
                                    <li key={n.id} className="py-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold text-cplp-navy">{n.subject}</p>
                                            <span className="text-xs text-cplp-grey whitespace-nowrap">
                                                {n.sentAt.toLocaleString("pt-PT")}
                                            </span>
                                        </div>
                                        <p className="text-sm text-cplp-grey mt-1">{n.message}</p>
                                        <p className="text-xs text-cplp-grey mt-2">
                                            {n.audienceLabel} · {n.successCount} enviado(s)
                                            {n.failureCount > 0 ? ` · ${n.failureCount} falhado(s)` : ""}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
