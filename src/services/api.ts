import axios from "axios";

const API_URL = "https://devsembo.pt/";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const enviarFeedback = async (dados: {
    nome: string;
    email: string;
    telemovel: string;
    pais: string;
    consulado: string;
    dificuldades: string;
    melhorias: string;
}) => {
    try {
        const response = await api.post("/api/form", dados); // Note: Added "/api" to match backend route
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar feedback:", error);
        throw error;
    }
};