"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username  must be 3 characters" })
    .max(20, { message: "Username  must be 20 characters" }),
  age: z.number().min(10),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
  firstName: z
    .string()
    .min(1, { message: "First name must be 1 characters" })
    .max(20, { message: "First name must be 20 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name must be 1 characters" })
    .max(20, { message: "Last name must be 20 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters" })
    .max(15, { message: "Phone must be 15 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be 3 characters" })
    .max(50, { message: "Address must be 50 characters" }),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  birthDate: z.date(),
  image: z.instanceof(File, { message: "Image is required" }),
});

type TeacherFormData = z.infer<typeof schema>;

export default function TeacherForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<TeacherFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: TeacherFormData) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">Create a teacher</h1>
      <span className="text-sm text-gray-500 font-medium">
        Authentication Information
      </span>
      <InputField label="Username" name="username" defaultValue={data?.username} register={register} errors={errors} />
      
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md border-none w-max self-center"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
