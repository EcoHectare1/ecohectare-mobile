import z from "zod";

export const loginSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
