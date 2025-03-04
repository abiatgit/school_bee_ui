"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const schema = z.object({
  studentName: z
    .string()
    .min(1, { message: "Student name is required" })
    .max(50, { message: "Student name must be less than 50 characters" }),
  examName: z
    .string()
    .min(1, { message: "Exam name is required" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" }),
  marksObtained: z
    .number()
    .min(0, { message: "Marks obtained must be at least 0" }),
  totalMarks: z
    .number()
    .min(1, { message: "Total marks must be at least 1" }),
  grade: z
    .string()
    .min(1, { message: "Grade is required" }),
  remarks: z
    .string()
    .max(500, { message: "Remarks must be less than 500 characters" })
    .optional(),
  examDate: z.date({
    required_error: "Exam date is required",
  })
});

type ResultFormData = z.infer<typeof schema>;

export default function ResultForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<ResultFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: ResultFormData) => {
    console.log(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ResultFormData>
          label="Student Name"
          name="studentName"
          register={register}
          error={errors}
          placeholder="Enter student name"
          type="text"
          defaultValue={data?.studentName}
        />

        <InputField<ResultFormData>
          label="Exam Name"
          name="examName"
          register={register}
          error={errors}
          placeholder="Enter exam name"
          type="text"
          defaultValue={data?.examName}
        />

        <InputField<ResultFormData>
          label="Subject"
          name="subject"
          register={register}
          error={errors}
          placeholder="Enter subject"
          type="text"
          defaultValue={data?.subject}
        />

        <InputField<ResultFormData>
          label="Marks Obtained"
          name="marksObtained"
          register={register}
          error={errors}
          placeholder="Enter marks obtained"
          type="number"
          defaultValue={data?.marksObtained?.toString()}
        />

        <InputField<ResultFormData>
          label="Total Marks"
          name="totalMarks"
          register={register}
          error={errors}
          placeholder="Enter total marks"
          type="number"
          defaultValue={data?.totalMarks?.toString()}
        />

        <InputField<ResultFormData>
          label="Grade"
          name="grade"
          register={register}
          error={errors}
          placeholder="Enter grade"
          type="text"
          defaultValue={data?.grade}
        />

        <InputField<ResultFormData>
          label="Exam Date"
          name="examDate"
          register={register}
          error={errors}
          type="date"
          defaultValue={data?.examDate?.toISOString().split('T')[0]}
          placeholder="Enter exam date"
        />

        <InputField<ResultFormData>
          label="Remarks"
          name="remarks"
          register={register}
          error={errors}
          placeholder="Enter remarks"
          type="textarea"
          defaultValue={data?.remarks}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {type === "create" ? "Create Result" : "Update Result"}
      </button>
    </form>
  );
}
