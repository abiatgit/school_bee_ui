"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const assignmentSchema = z.object({
  name: z.string().min(1, "Assignment name is required"),
  subject: z.string().min(1, "Subject is required"),
  classLevel: z.string().min(1, "Class level is required"),
  dueDate: z.string().min(1, "Due date is required"),
  totalMarks: z.string().min(1, "Total marks is required"),
  description: z.string().min(1, "Description is required"),
  attachments: z.any().optional()
});

type AssignmentFormData = z.infer<typeof assignmentSchema>;

interface AssignmentFormProps {
  type: "create" | "update";
  data?: AssignmentFormData;
}

export default function AssignmentForm({ type = "create", data }: AssignmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
  });

  const onSubmit = (data: AssignmentFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-4xl p-4"
    >
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<AssignmentFormData>
          label="Assignment Name"
          name="name"
          register={register}
          error={errors}
          placeholder="Enter assignment name"
          type="text"
          defaultValue={data?.name}
        />

        <InputField<AssignmentFormData>
          label="Subject"
          name="subject"
          register={register}
          error={errors}
          placeholder="Enter subject"
          type="text"
          defaultValue={data?.subject}
        />

        <InputField<AssignmentFormData>
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
        <InputField<AssignmentFormData>
          label="Due Date"
          name="dueDate"
          register={register}
          error={errors}
          placeholder="Enter due date"
          type="date"
          defaultValue={data?.dueDate}
        />

        <InputField<AssignmentFormData>
          label="Total Marks"
          name="totalMarks"
          register={register}
          error={errors}
          placeholder="Enter total marks"
          type="number"
          defaultValue={data?.totalMarks}
        />

        <div className="flex flex-col gap-2 w-full md:w-[calc(33.33%-1rem)]">
          <label>Attachments</label>
          <input
            type="file"
            multiple
            {...register("attachments")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>Description</label>
        <textarea
          {...register("description")}
          className="ring-[1.5px] ring-gray-300 rounded-md p-2 min-h-[100px]"
          placeholder="Enter assignment description"
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
