import { z } from "zod";

// ─── Regras da senha ────────────────────────────────────────────────────────
// ✅ Tamanho mínimo: 6 caracteres
// ✅ Pelo menos uma letra maiúscula
// ✅ Pelo menos um número

const passwordSchema = z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número.");

// ─── Schema de registro ─────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  email: z
    .string()
    .email("E-mail inválido. Verifique o formato (ex: user@email.com)."),
  password: passwordSchema,
  role: z.enum(["admin", "professor", "aluno"], {
    errorMap: () => ({ message: "Role inválido. Use: admin, professor ou aluno." }),
  }),
});

// ─── Schema de login ────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});
