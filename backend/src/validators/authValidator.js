import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número.");

export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  email: z.string().email("E-mail inválido. Verifique o formato (ex: user@email.com)."),
  password: passwordSchema,
  role: z.enum(["admin", "professor", "aluno"], {
    errorMap: () => ({ message: "Role inválido. Use: admin, professor ou aluno." }),
  }).optional().default("aluno"),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});
