import { z } from "zod";

export const createGradeSchema = z.object({
  student_id: z.number({ invalid_type_error: "student_id deve ser um número." })
    .int("student_id deve ser um inteiro.")
    .positive("student_id deve ser positivo."),
  class_id: z.number({ invalid_type_error: "class_id deve ser um número." })
    .int("class_id deve ser um inteiro.")
    .positive("class_id deve ser positivo."),
  value: z.number({ invalid_type_error: "A nota deve ser um número." })
    .min(0, "A nota deve ser no mínimo 0.")
    .max(10, "A nota deve ser no máximo 10."),
});

export const updateGradeSchema = z.object({
  value: z.number({ invalid_type_error: "A nota deve ser um número." })
    .min(0, "A nota deve ser no mínimo 0.")
    .max(10, "A nota deve ser no máximo 10."),
});
