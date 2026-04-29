/**
 * Middleware de validação genérico.
 * Recebe um schema Zod e valida o req.body.
 * Em caso de erro, retorna 422 com a lista de erros formatados.
 *
 * @param {import("zod").ZodSchema} schema
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res.status(422).json({
        success: false,
        message: "Dados inválidos.",
        errors,
      });
    }

    // Substitui req.body pelos dados já parseados/limpos pelo Zod
    req.body = result.data;
    next();
  };
}