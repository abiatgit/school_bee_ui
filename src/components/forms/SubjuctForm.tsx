"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/serverAction";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Teacher } from "@prisma/client";
import { CldUploadWidget } from 'next-cloudinary';

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z
    .string()
    .min(2, { message: "Subject name must be at least 2 characters" })
    .max(50, { message: "Subject name must be less than 50 characters" }),
  teachers: z.array(z.string()).min(1, { message: "Please select at least one teacher" })
});

type SubjectFormData = z.infer<typeof subjectSchema>;

const initialState = {
  success: false,
  error: false,
};

export default function SubjectForm({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: Partial<SubjectFormData>;
  setOpen: (state: boolean) => void;
  relatedData?: { teachers: Teacher[] };
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name || "",
      id: data?.id || 0,
      teachers: data?.teachers || [],
    },
  });
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    type === "create" ? createSubject : updateSubject, // Use `updateSubject` if type i,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
      toast.success(
        `Subject Has been${type === "create" ? "Created" : "Updated"}`,
        { toastId: "success" }
      );
    }
    if (state.error) {
      toast.error("Failed to create subject.", { toastId: "error" });
    }
  }, [state.success, state.error]);

  const onSubmit = (formData: SubjectFormData) => {
    startTransition(() => {
      formAction({
        name: formData.name,
        id: formData.id?.toString() || "",
        teachers: formData.teachers || []
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <h1 className="text-2xl">
        {type === "create" ? "Create a subject" : "Update a subject"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<SubjectFormData>
          label="Subject Name"
          name="name"
          register={register}
          error={errors}
          placeholder="Enter subject name"
          type="text"
          defaultValue={data?.name}
        />
        {data && (
          <InputField<SubjectFormData>
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
          <label>Teacher</label>
          <select
            multiple
            {...register("teachers")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 min-h-[100px]"
            defaultValue={data?.teachers || []}
          >
            {Array.isArray(relatedData?.teachers) && relatedData.teachers.length > 0 ? (
              relatedData.teachers.map((teacher) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name} {teacher.surname}
                </option>
              ))
            ) : (
              <option value="" disabled>No teachers available</option>
            )}
          </select>
          {errors?.teachers?.message && (
            <p className="text-red-500 text-xs">
              {errors?.teachers?.message as string}
            </p>
          )}
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
