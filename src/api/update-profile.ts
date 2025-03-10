import { api } from "@/lib/axios";

export interface updateProfileBody {
    name: string
    description: string | null
}

export async function updateProfile(profile: updateProfileBody) {
    await api.put('/profile', profile);
}