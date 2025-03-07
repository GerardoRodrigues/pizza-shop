import { z } from 'zod'

const env$chema = z.object({
    VITE_API_URL: z.string().url()
})

export const env = env$chema.parse(import.meta.env)