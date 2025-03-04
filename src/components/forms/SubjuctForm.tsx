"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";


const schema = z.object({
  subjectName: z
    .string()
    .min(2, { message: "Subject name must be at least 2 characters" })
    .max(50, { message: "Subject name must be less than 50 characters" }),
  subjectCode: z
    .string()
    .min(2, { message: "Subject code must be at least 2 characters" })
    .max(10, { message: "Subject code must be less than 10 characters" }),
  description: z
    .string()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  credits: z
    .number()
    .min(1, { message: "Credits must be at least 1" })
    .max(10, { message: "Credits must be less than 10" }),
  department: z
    .string()
    .min(2, { message: "Department is required" }),
  semester: z
    .number()
    .min(1, { message: "Semester must be at least 1" })
    .max(8, { message: "Semester must be less than 8" })
});

type SubjectFormData = z.infer<typeof schema>;

export default function SubjectForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<SubjectFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: SubjectFormData) => {
    console.log(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<SubjectFormData>
          label="Subject Name"
          name="subjectName"
          register={register}
          error={errors}
          placeholder="Enter subject name"
          type="text"
          defaultValue={data?.subjectName}
        />

        <InputField<SubjectFormData>
          label="Subject Code"
          name="subjectCode"
          register={register}
          error={errors}
          placeholder="Enter subject code"
          type="text"
          defaultValue={data?.subjectCode}
        />

        <InputField<SubjectFormData>
          label="Credits"
          name="credits"
          register={register}
          error={errors}
          placeholder="Enter credits"
          type="number"
          defaultValue={data?.credits?.toString()}
        />

        <InputField<SubjectFormData>
          label="Department"
          name="department"
          register={register}
          error={errors}
          placeholder="Enter department"
          type="text"
          defaultValue={data?.department}
        />

        <InputField<SubjectFormData>
          label="Semester"
          name="semester"
          register={register}
          error={errors}
          placeholder="Enter semester"
          type="number"
          defaultValue={data?.semester?.toString()}
        />

        <InputField<SubjectFormData>
          label="Description"
          name="description"
          register={register}
          error={errors}
          placeholder="Enter description"
          type="textarea"
          defaultValue={data?.description}
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
