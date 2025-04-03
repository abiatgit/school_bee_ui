"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { createStudent, updateStudent } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CloudinaryResult = {
  info?: {
    secure_url?: string;
  };
  widget?: {
    close: () => void;
  };
};

const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be 3 characters" })
    .max(20, { message: "Username must be 20 characters" }),
  name: z
    .string()
    .min(1, { message: "First name must be 1 character" })
    .max(20, { message: "First name must be 20 characters" }),
  surname: z
    .string()
    .min(1, { message: "Last name must be 1 character" })
    .max(20, { message: "Last name must be 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(15, { message: "Phone number must be at most 15 characters" })
    .nullable()
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be 3 characters" })
    .max(50, { message: "Address must be 50 characters" }),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  image: z.string().optional(),
});
type StudentFormData = z.infer<typeof schema>;

export default function StudentForm({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: Partial<StudentFormData>;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [img, setImg] = useState<string | undefined>(data?.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(schema),
    defaultValues: data
  });

  const [state, formAction] = useActionState(
    (state: { success: boolean; error: boolean }, formData: StudentFormData) =>
      type === "create" ? createStudent(state, formData) : updateStudent(state, formData),
    { success: false, error: false }
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
      toast.success(`Student has been ${type === "create" ? "Created" : "Updated"}`, {
        toastId: "success",
      });
    }
    if (state.error) {
      toast.error("Failed to update student.", { toastId: "error" });
    }
  }, [state.success, state.error]);

  const onSubmit = async (formData: StudentFormData) => {
    console.log("Form submitted with data:", formData);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }
    try {
      formData.image = img;
      const result = await formAction(formData);
      console.log("Form action result:", result);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a Student " : "Update a Student"}
      </h1>
      <span className="text-sm text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<StudentFormData>
          label="Username"
          name="username"
          register={register}
          error={errors}
          placeholder="Username"
          type="text"
          defaultValue={data?.username}
        />

        <InputField<StudentFormData>
          label="Email"
          name="email"
          register={register}
          error={errors}
          placeholder="Email"
          type="email"
          defaultValue={data?.email}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<StudentFormData>
          label="First Name"
          name="name"
          register={register}
          error={errors}
          placeholder="First Name"
          type="text"
          defaultValue={data?.name}
        />
        <InputField<StudentFormData>
          label="Last Name"
          name="surname"
          register={register}
          error={errors}
          placeholder="Last Name"
          type="text"
          defaultValue={data?.surname}
        />
        <InputField<StudentFormData>
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
        <InputField<StudentFormData>
          label="Address"
          name="address"
          register={register}
          error={errors}
          placeholder="Address"
          type="text"
          defaultValue={data?.address}
        />
        <InputField<StudentFormData>
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
            <p className="text-red-500 text-xs">{errors?.gender?.message as string}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-ful md:w-1/4">
          <CldUploadWidget
            uploadPreset="schoolbee"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              if (typeof result.info === 'object' && result.info?.secure_url) {
                setImg(result.info.secure_url);
              }
              const widget = document.querySelector('.cloudinary-upload-widget') as HTMLElement;
              if (widget) {
                widget.style.display = 'none';
              }
            }}
          >
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
          {errors?.image?.message && (
            <p className="text-red-500 text-xs">{errors?.image?.message as string}</p>
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
