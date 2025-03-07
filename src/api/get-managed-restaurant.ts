import { api } from "@/lib/axios";

export interface restaurantBody {
    name: string;
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
}

export async function getManagedRestaurant() {
    const response = await api.get<restaurantBody>("/managed-restaurant")

    return response.data;
}