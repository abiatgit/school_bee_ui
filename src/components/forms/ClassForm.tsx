"use client";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { startTransition, useActionState, useEffect } from "react";
import { createClass, updateClass } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Teacher } from "@prisma/client";


const classSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "subject name is required" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required" }),
  gradeId: z.coerce.number().min(1, { message: "Capacity name is required" }),
  supervisorId: z.coerce.string().optional(),
  teachers: z.array(z.string()).optional()
});

type ClassFormData = z.infer<typeof classSchema>;

const initialState = {
  success: false,
  error: false,
};

export default function ClassForm({
  type,
  data,
  setOpen,
  relatedData,
}:{
  type: "create" | "update";
  data?: Partial<ClassFormData>;
  setOpen: (state: boolean) => void;
  relatedData?: { 
    teachers: Teacher[];
    grades: { id: number; level: string; }[];
  };
}) {
  console.log("hello this is great","data",data)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      title: data?.title|| "",
      id: data?.id ?? undefined, // Avoid setting `0` as default
      capacity: data?.capacity ?? undefined, 
      gradeId: data?.gradeId ?? undefined, 
      supervisorId: data?.supervisorId ?? "",
      teachers: data?.teachers || [],
    },
  });
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    (state: { success: boolean; error: boolean }, formData: { title: string; id: string; teachers: string[]; capacity: number; gradeId: string }) => 
      type === "create" ? createClass(state,formData) : updateClass(state, formData),
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
      toast.success(
        `Class has been ${type === "create" ? "created" : "updated"}`, // Fixed spacing and capitalization
        { toastId: "success" }
      );
    }
    if (state.error) {
      toast.error("Failed to create class.", { toastId: "error" }); // Fixed error message to match class instead of subject
    }
  }, [state.success, state.error, setOpen, router, type]); // Added missing dependencies

  const { teachers, grades = [] } = relatedData || {};

  const onSubmit = (formData: ClassFormData) => {
    startTransition(() => {
      formAction({
        title: formData.title,
        id: formData.id?.toString() || "",
        teachers: formData.supervisorId ? [formData.supervisorId] : [],
        capacity: Number(formData.capacity),
        gradeId: formData.gradeId.toString(),
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <h1 className="text-2xl">
        {type === "create" ? "Create a Class" : "Update a Class"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ClassFormData>
          label="Class Name"
          name="title"
          register={register}
          error={errors}
          placeholder="Enter subject name"
          type="text"
          defaultValue={data?.title}
        />
        <InputField<ClassFormData>
          label="Capacity"
          name="capacity"
          register={register}
          error={errors}
          placeholder="Enter subject name"
          type="text"
          defaultValue={data?.title}
        />
        {data && (
          <InputField<ClassFormData>
            label="Id"
            name="id"
            register={register}
            error={errors}
            hidden
            type="number"
            placeholder="Enter ID"
            defaultValue={data?.id?.toString()}
          />
        )}
        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <label>Supervisor</label>
          <select
            {...register("supervisorId")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 min-h-[100px]"
            defaultValue={data?.supervisorId}
          >
            {Array.isArray(teachers) && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name} 
                </option>
              ))
            ) : (
              <option value="" disabled>No teachers available</option>
            )}
          </select>
          {errors?.supervisorId?.message && (
            <p className="text-red-500 text-xs">
              {errors?.supervisorId.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
        <label>Grade</label>
        <select {...register("gradeId")} className="ring-1 ring-gray-300 rounded-md p-2">
          {grades.length >0 ?(grades.map((grade) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))
          ) : (
            <option value="" disabled>No grades available</option>
          )}
        </select>
      </div>

      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {pending
          ? "Submitting..."
          : type === "create"
          ? "Create Subject"
          : "Update Subject"}
      </button>
    </form>
  );
}