"use client";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
// import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createExam, updateExam } from "@/lib/serverAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Examschema = z.object({
  id:number(),
  title: z.string().min(1, { message: "Exam title is required" }),
  startTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid start time" }),
  endTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid end time" }),
  lessonId: z
    .string()
    .min(1, { message: "Lesson is required" })
    .transform((val) => parseInt(val, 10)),
});


type ExamFormData = z.infer<typeof Examschema>;

export default function ExamForm({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: Partial<ExamFormData>;
  setOpen: (open: boolean) => void;
  relatedData: any;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(Examschema),
    defaultValues: data,
  });
  const { lessons } = relatedData;


  const [state, formAction] = useActionState(
    (state: { success: boolean; error: boolean }, formData: ExamFormData) =>
      type === "create"
        ? createExam(state, formData,data)
        : updateExam(state, formData),
    { success: false, error: false }
  );
  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
      toast.success(
        `Student has been ${type === "create" ? "Created" : "Updated"}`,
        {
          toastId: "success",
        }
      );
    }
    if (state.error) {
      toast.error("Failed to update student.", { toastId: "error" });
    }
  }, [state.success, state.error]);

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create an Exam" : "Update Exam"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ExamFormData>
          label="Exam Name"
          name="title"
          register={register}
          placeholder="Enter exam name"
          type="text"
          defaultValue={data?.lesson.Subject.name}
          error={errors}
        />

        <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime?.toISOString().slice(0, 16)}
          register={register}
          error={errors}
          type="datetime-local"
          placeholder="Enter start time"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime?.toISOString().slice(0, 16)}
          register={register}
          error={errors}
          type="datetime-local"
          placeholder="Enter end time"
        />

        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id?.toString()}
            register={register}
            error={errors}
    
            hidden
          />
        )}
        <select {...register("lessonId")} className="border rounded-md p-2">
          <option value="">Select a Lesson</option>
          {relatedData?.lessons?.map((lesson:any) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
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
