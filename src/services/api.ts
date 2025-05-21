import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const enviarFeedback = async (dados: {
    nome: string;
    email: string;
    pais: string;
    consulado: string;
    dificuldades: string;
    melhorias: string;
}) => {
    try {
        const response = await api.post("/api/feedback", dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar feedback:", error);
        throw error;
    }
};
