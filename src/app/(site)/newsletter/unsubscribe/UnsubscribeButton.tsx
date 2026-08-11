"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { unsubscribeAction } from "./actions";

export default function UnsubscribeButton({ token }: { token: string }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<"success" | "error" | null>(null);

    const handleClick = () => {
        startTransition(async () => {
            const res = await unsubscribeAction(token);
            setResult(res.success ? "success" : "error");
        });
    };

    if (result === "success") {
        return <p className="text-cplp-grey">A sua subscrição foi cancelada com sucesso.</p>;
    }

    if (result === "error") {
        return <p className="text-red-600">Não foi possível encontrar esta subscrição.</p>;
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isPending}
            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
        >
            {isPending ? "A processar..." : "Confirmar cancelamento"}
        </Button>
    );
}
