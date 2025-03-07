import { api } from "@/lib/axios";

export interface profileBody {
    name: string;
    id: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getProfile() {
    const response = await api.get<profileBody>("/me");

    return response.data;
}