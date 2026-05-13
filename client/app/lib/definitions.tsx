import * as z from 'zod';

// export const SignupFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, { error: "Name must be at least 2 characters long." })
//     .trim(),
//   email: z.email({ error: "Please enter a valid email." }).trim(),
//   password: z
//     .string()
//     .min(8, { error: "Be at least 8 characters long" })
//     .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
//     .regex(/[0-9]/, { error: "Contain at least one number." })
//     .regex(/[^a-zA-Z0-9]/, {
//       error: "Contain at least one special character.",
//     })
//     .trim(),
// });

// TODO: Before production, remove this dev schema
export const SignupFormSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters long.' }).trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
