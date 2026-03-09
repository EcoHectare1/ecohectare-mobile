import z from "zod";

export const accountManagementSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto").optional(),
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("E-mail inválido")
      .optional(),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .or(z.literal(""))
      .optional(),
    confirmPassword: z.string().or(z.literal("")).optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "As senhas não conferem",
    },
  );

export type AccountManagementFormData = z.infer<typeof accountManagementSchema>;
