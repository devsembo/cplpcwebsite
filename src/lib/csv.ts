// Exportação de listas (inscrições, candidaturas) para CSV, feita no browser
// para não precisar de um endpoint só para descarregar um ficheiro.
function escapeCell(value: unknown): string {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
}

export function downloadCsv(filename: string, headers: string[], rows: unknown[][]): void {
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(";")).join("\r\n");
    // BOM para o Excel abrir os acentos corretamente.
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
