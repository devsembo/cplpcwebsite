export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB — margem sob o limite de 10MB das Server Actions

export function validateImageFile(file: File): string | null {
    if (!file.type.startsWith("image/")) {
        return "O ficheiro tem de ser uma imagem.";
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return "A imagem é demasiado grande (máximo 8MB).";
    }
    return null;
}
