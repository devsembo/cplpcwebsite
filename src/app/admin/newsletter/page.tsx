import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

export default async function AdminNewsletterPage() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: "desc" },
    });
    const activeCount = subscribers.filter((s) => s.active).length;

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-2">Newsletter</h1>
            <p className="text-sm text-cplp-grey mb-8">
                {activeCount} subscritor{activeCount === 1 ? "" : "es"} ativo{activeCount === 1 ? "" : "s"} de{" "}
                {subscribers.length} no total.
            </p>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Subscrito em</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscribers.map((subscriber) => (
                            <TableRow key={subscriber.id}>
                                <TableCell className="font-medium text-cplp-navy">{subscriber.email}</TableCell>
                                <TableCell>
                                    <Badge variant={subscriber.active ? "default" : "outline"}>
                                        {subscriber.active ? "Ativo" : "Cancelado"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {subscriber.subscribedAt.toLocaleDateString("pt-PT")}
                                </TableCell>
                            </TableRow>
                        ))}
                        {subscribers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-cplp-grey py-8">
                                    Sem subscritores ainda.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
