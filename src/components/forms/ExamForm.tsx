"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Exam name is required" })
    .max(50, { message: "Exam name must be less than 50 characters" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" }),
  date: z.date({
    required_error: "Date is required",
  }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" }),
  totalMarks: z
    .number()
    .min(1, { message: "Total marks must be at least 1" }),
  classLevel: z
    .string()
    .min(1, { message: "Class level is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" })
});

type ExamFormData = z.infer<typeof schema>;

export default function ExamForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<ExamFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: ExamFormData) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create an Exam" : "Update Exam"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ExamFormData>
          label="Exam Name"
          name="name"
          register={register}
          error={errors}
          placeholder="Enter exam name"
          type="text"
          defaultValue={data?.name}
        />

        <InputField<ExamFormData>
          label="Subject"
          name="subject" 
          register={register}
          error={errors}
          placeholder="Enter subject"
          type="text"
          defaultValue={data?.subject}
        />

        <InputField<ExamFormData>
          label="Class Level"
          name="classLevel"
          register={register}
          error={errors}
          placeholder="Enter class level"
          type="text"
          defaultValue={data?.classLevel}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ExamFormData>
          label="Date"
          name="date"
          register={register}
          error={errors}
          placeholder="Enter date"
          type="date"
          defaultValue={data?.date?.toString()}
        />

        <InputField<ExamFormData>
          label="Start Time"
          name="startTime"
          register={register}
          error={errors}
          placeholder="Enter start time"
          type="time"
          defaultValue={data?.startTime}
        />

        <InputField<ExamFormData>
          label="Duration (minutes)"
          name="duration"
          register={register}
          error={errors}
          placeholder="Enter duration in minutes"
          type="number"
          defaultValue={data?.duration?.toString()}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ExamFormData>
          label="Total Marks"
          name="totalMarks"
          register={register}
          error={errors}
          placeholder="Enter total marks"
          type="number"
          defaultValue={data?.totalMarks?.toString()}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>Description</label>
        <textarea
          {...register("description")}
          className="ring-[1.5px] ring-gray-300 rounded-md p-2 min-h-[100px]"
          placeholder="Enter exam description"
          defaultValue={data?.description}
        />
        {errors?.description?.message && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md border-none w-max self-center"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
