"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createSubject } from "@/lib/serverAction";

export const subjectSchema = z.object({
  subject: z
    .string()
    .min(2, { message: "Subject name must be at least 2 characters" })
    .max(50, { message: "Subject name must be less than 50 characters" }),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

export default function SubjectForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<SubjectFormData>;
}) {
  const {
    register,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });



  return (
    <form
      action={ createSubject}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <h1 className="text-2xl">
        {type === "create" ? "Create a subject" : "Update a subject"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<SubjectFormData>
          label="Subject Name"
          name="subject"
          register={register}
          error={errors}
          placeholder="Enter subject name"
          type="text"
          defaultValue={data?.subject}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {type === "create" ? "Create Subject" : "Update Subject"}
      </button>
    </form>
  );
}
