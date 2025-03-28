"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const Teacherschema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username  must be 3 characters" })
    .max(20, { message: "Username  must be 20 characters" }),
  name: z
    .string()
    .min(1, { message: "First name must be 1 characters" })
    .max(20, { message: "First name must be 20 characters" }),
  surname: z
    .string()
    .min(1, { message: "Last name must be 1 characters" })
    .max(20, { message: "Last name must be 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters" })
    .max(15, { message: "Phone must be 15 characters" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
  image: z.instanceof(File, { message: "Image is required" }).optional(),
  address: z
    .string()
    .min(3, { message: "Address must be 3 characters" })
    .max(50, { message: "Address must be 50 characters" }),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  birthDate: z.union([z.string(), z.date()]),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  lessons: z.array(z.object({ id: z.string() })).optional(),
  classes: z.array(z.object({ id: z.string() })).optional(),
});

type TeacherFormData = z.infer<typeof Teacherschema>;
export default function TeacherForm({
  type,
  data,
  setOpen,
  relatedData
}: {
  type: "create" | "update";
  data?: Partial<TeacherFormData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?:any
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(Teacherschema),
  });

  
  const onSubmit = handleSubmit((data: TeacherFormData) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8 " onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a Teacher" : "Update a Teacher"}
      </h1>
      <span className="text-sm text-gray-500 font-medium">
        Authentication Information
      </span>
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
          label="Email"
          name="email"
          register={register}
          error={errors}
          placeholder="Email"
          type="email"
          defaultValue={data?.email}
        />
        <InputField<TeacherFormData>
          label="Password"
          name="password"
          register={register}
          error={errors}
          placeholder="Password"
          type="password"
          defaultValue={data?.password}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<TeacherFormData>
          label="First Name"
          name="firstName"
          register={register}
          error={errors}
          placeholder="First Name"
          type="text"
          defaultValue={data?.firstName}
        />
        <InputField<TeacherFormData>
          label="Last Name"
          name="lastName"
          register={register}
          error={errors}
          placeholder="Last Name"
          type="text"
          defaultValue={data?.lastName}
        />
        <InputField<TeacherFormData>
          label="Phone"
          name="phone"
          register={register}
          error={errors}
          placeholder="Phone"
          type="text"
          defaultValue={data?.phone}
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
        <InputField<TeacherFormData>
          label="Birth Date"
          name="birthDate"
          register={register}
          error={errors}
          placeholder="Birth Date"
          type="date"
          defaultValue={data?.birthDate?.toString()}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <label>{"Gender"}</label>
          <select
            {...register("gender")}
            className="ring-[1.5px] ring-gray-300 rounded-md p-2"
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors?.gender?.message && (
            <p className="text-red-500 text-xs">
              {errors?.gender?.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <label
            className="text-sm font-medium text-gray-500 gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="upload" width={28} height={28} />
            <span>Upload Image</span>
          </label>
          <input
            id="img"
            type="file"
            {...register("image")}
            className="hidden"
            accept="image/*"
          />
          {errors?.image?.message && (
            <p className="text-red-500 text-xs">
              {errors?.image?.message as string}
            </p>
          )}
        </div>
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
