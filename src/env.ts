import { z } from "zod";

const env$chema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === "true"),
});

export const env = env$chema.parse(import.meta.env);
