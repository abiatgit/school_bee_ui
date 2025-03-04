"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Lesson name must be at least 3 characters" })
    .max(50, { message: "Lesson name must be less than 50 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .max(480, { message: "Duration cannot exceed 8 hours" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" }),
  classLevel: z
    .string()
    .min(1, { message: "Class level is required" }),
  teacherId: z
    .string()
    .min(1, { message: "Teacher is required" })
});

type LessonFormData = z.infer<typeof schema>;

export default function LessonForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<LessonFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: LessonFormData) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a Lesson" : "Update Lesson"}
      </h1>
      
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<LessonFormData>
          label="Lesson Name"
          name="name"
          register={register}
          error={errors}
          placeholder="Enter lesson name"
          type="text"
          defaultValue={data?.name}
        />

        <InputField<LessonFormData>
          label="Duration (minutes)"
          name="duration"
          register={register}
          error={errors}
          placeholder="Enter duration in minutes"
          type="number"
          defaultValue={data?.duration?.toString()}
        />

        <InputField<LessonFormData>
          label="Subject"
          name="subject"
          register={register}
          error={errors}
          placeholder="Enter subject"
          type="text"
          defaultValue={data?.subject}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField<LessonFormData>
          label="Class Level"
          name="classLevel"
          register={register}
          error={errors}
          placeholder="Enter class level"
          type="text"
          defaultValue={data?.classLevel}
        />

        <InputField<LessonFormData>
          label="Teacher ID"
          name="teacherId"
          register={register}
          error={errors}
          placeholder="Enter teacher ID"
          type="text"
          defaultValue={data?.teacherId}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>Description</label>
        <textarea
          {...register("description")}
          className="ring-[1.5px] ring-gray-300 rounded-md p-2 min-h-[100px]"
          placeholder="Enter lesson description"
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
