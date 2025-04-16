"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createTeacher, updateTeacher } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";

export const Teacherschema = z.object({
  id: z.string().optional(),
  username: z
    .string(),
    
  name: z
    .string()
    ,
  surname: z
    .string()
   ,
  email: z.string().email({ message: "Invalid email address" }).nullable().optional(),
  password:z.string().optional(),
  phone: z
    .string()
    .nullable()
    .optional(),
  image: z.string().optional(),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  gender: z.enum(["male", "female"], { message: "Invalid gender" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .max(50, { message: "Address must be at most 50 characters" }),
  createdAt: z.date().optional(),
  subjects: z.array(z.string()).optional(),
  lessons: z.array(z.object({ id: z.string() })).optional(),
  classes: z.array(z.object({ id: z.string() })).optional(),
});

const initialState = {
  success: false,
  error: false,
};

type TeacherFormData = z.infer<typeof Teacherschema>;

export default function TeacherForm({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: Partial<TeacherFormData>;
  setOpen: (open: boolean) => void;
  relatedData?:never
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(Teacherschema),
    defaultValues: {
      id: data?.id,
      username: data?.username || "",
      name: data?.name || "",
      surname: data?.surname || "",
      email: data?.email || "",
      phone: data?.phone || "",
      gender: data?.gender || "male",
      address: data?.address || "",
      bloodGroup: data?.bloodGroup || "",
      subjects: data?.subjects || []
    }
  });

const [img,setImg]=useState<never>()
  const router = useRouter();
  const [state, formAction,] = useActionState(
    (state: { success: boolean; error: boolean }, formData: TeacherFormData) => 
      type === "create" ? createTeacher(state, formData) : updateTeacher(state, formData),
    initialState
  );
// const {subjects}=relatedData

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
      toast.success(
        `Teacher Has been${type === "create" ? "Created" : "Updated"}`,
        { toastId: "success" }
      );
    }
    if (state.error) {
      toast.error("Failed to create subject.", { toastId: "error" });
    }
  }, [state.success, state.error, setOpen, router, type]);

  const onSubmit = (formData: TeacherFormData) => {
    console.log('Form submitted with data:', formData);
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      return;
    }
    startTransition(() => {
      formData.image = img?.secure_url;
      if (formData.subjects) {
        formData.subjects = Array.isArray(formData.subjects) 
          ? formData.subjects
          : [formData.subjects];
      }
      formAction(formData);
    });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit, (errors) => {
      console.log('Form validation errors:', errors);
    })} noValidate>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a Teacher" : "Update a Teacher"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<TeacherFormData>
          label="Username"
          name="username"
          register={register}
          error={errors}
          placeholder="Username"
          type="text"
          defaultValue={data?.username}
        />
         <InputField<TeacherFormData>
          label="password"
          name="password"
          register={register}
          error={errors}
          placeholder="Password"
          type="password"
          
        />
        <InputField<TeacherFormData>
          label="Email"
          name="email"
          register={register}
          error={errors}
          placeholder="Email"
          type="email"
          defaultValue={data?.email || ""}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<TeacherFormData>
          label="First Name"
          name="name"
          register={register}
          error={errors}
          placeholder="First Name"
          type="text"
          defaultValue={data?.name}
        />
        <InputField<TeacherFormData>
          label="Last Name"
          name="surname"
          register={register}
          error={errors}
          placeholder="Last Name"
          type="text"
          defaultValue={data?.surname}
        />
        <InputField<TeacherFormData>
          label="Phone"
          name="phone"
          register={register}
          error={errors}
          placeholder="Phone"
          type="text"
          defaultValue={data?.phone || ""}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<TeacherFormData>
          label="Address"
          name="address"
          register={register}
          error={errors}
          placeholder="Address"
          type="text"
          defaultValue={data?.address}
        />
        <InputField<TeacherFormData>
          label="Blood Group"
          name="bloodGroup"
          register={register}
          error={errors}
          placeholder="Blood Group"
          type="text"
          defaultValue={data?.bloodGroup}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <label>Gender</label>
          <select
            {...register("gender")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2"
            defaultValue={data?.gender}
          >
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
          </select>
          {errors?.gender?.message && (
            <p className="text-red-500 text-xs">
              {errors?.gender?.message as string}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <label>Subject</label>
          <select
            multiple
            {...register("subjects")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2"
            defaultValue={data?.subjects} 
          >
            {subjects?.map((subject: {id: number, name: string}) => (
              <option value={subject.id} key={subject.id}>{subject.name}</option>
            ))}
          </select>
          {errors?.subjects?.message && (
            <p className="text-red-500 text-xs">
              {errors?.subjects?.message as string}
            </p>
          )}
        </div>
        <CldUploadWidget uploadPreset="schoolbee" onSuccess={(result, widget) => {
          setImg(result.info);
          widget.close();
        }}>
          {({ open }) => (
            <div
              className="text-sm font-medium text-gray-500 gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image src="/upload.png" alt="upload" width={28} height={28} />
              <span>Upload Image</span>
            </div>
          )}
        </CldUploadWidget>
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
