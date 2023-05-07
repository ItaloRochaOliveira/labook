import z from "zod";

export interface UpdatePostInputDTO {
  token: string;
  content: string;
}

export const UpdatePostScheme = z
  .object({
    token: z.string().min(1),
    content: z.string().min(1),
  })
  .transform((data) => data as UpdatePostInputDTO);
