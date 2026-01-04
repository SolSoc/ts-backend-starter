import { z } from "zod";

export const helloQuerySchema = z.object({
  name: z.string().optional().default("world"),
});

export type HelloQuery = z.infer<typeof helloQuerySchema>;
