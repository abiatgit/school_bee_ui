
import { z } from "zod";

export const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be 3 characters" })
    .max(20, { message: "Username must be 20 characters" }),
  name: z
    .string()
    .min(1, { message: "First name must be 1 character" })
    .max(20, { message: "First name must be 20 characters" }),
  surname: z
    .string()
    .min(1, { message: "Last name must be 1 character" })
    .max(20, { message: "Last name must be 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(15, { message: "Phone number must be at most 15 characters" })
    .nullable()
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be 3 characters" })
    .max(50, { message: "Address must be 50 characters" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Invalid gender" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  image: z.string().optional(),
  gradeId:z.coerce.number().min(1,{message:"grade is required"}),
  classId:z.coerce.number().min(1,{message:"Grade is required"}),
  parentId:z.string().min(1,{message:"Parent id is required"})
});