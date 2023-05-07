import z from "zod";

export interface DeletePostInputDTO {
  token: string;
  id: string;
}

export const DeletePostScheme = z.object({
  token: z.string().min(1),
  id: z.string().min(1),
});
