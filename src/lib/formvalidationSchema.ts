import { z } from "zod";
export const subjectSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Subject name must be at least 2 characters" })
      .max(50, { message: "Subject name must be less than 50 characters" }),
  });
  
export type SubjectSchema = z.infer<typeof subjectSchema>;