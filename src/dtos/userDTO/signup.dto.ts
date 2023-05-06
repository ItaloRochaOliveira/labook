import z from "zod";

export interface SignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignupOutputDTO {
  message: string;
  token: string;
}

export const SignupScheme = z
  .object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
  })
  .transform((data) => data as SignupInputDTO);
