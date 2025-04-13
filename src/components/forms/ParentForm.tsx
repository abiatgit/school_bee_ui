"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { useActionState, useEffect } from "react";
import { createParent, updateParent } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  name: z
    .string()
    .min(1, { message: "name must have at least 1 character" })
    .max(20, { message: "name must be at most 20 characters" }),
  surname: z
    .string()
    .min(1, { message: "Surname must have at least 1 character" })
    .max(20, { message: "Surname must be at most 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .max(50, { message: "Address must be at most 50 characters" }),
  students: z.array(z.string()).optional(),
});

export type ParentFormSchema = z.infer<typeof schema>;
const initialState = {
  success: false,
  error: false,
};

export default function ParentForm({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: Partial<ParentFormSchema>;
  setOpen: (state: boolean) => void;
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (
      state: { success: boolean; error?: boolean },
      formData: ParentFormSchema
    ) => {
      if (type === "create") {
        return await createParent(state, formData);
      } else {
        return await updateParent(state, formData);
      }
    },
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

  const onSubmit = (data: ParentFormSchema) => {
    console.log("Abi Data Abi",data)
    formAction(data);
  };

  return (
    <form className="flex flex-col gap-8 " onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a parent form" : "Update a parent form"}
      </h1>
      <span className="text-sm text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ParentFormSchema>
          label="Username"
          name="username"
          register={register}
          error={errors}
          placeholder="Username"
          type="text"
        />
        <InputField<ParentFormSchema>
          label=" Name"
          name="name"
          register={register}
          error={errors}
          placeholder="First Name"
          type="text"
        />
        <InputField<ParentFormSchema>
          label="SurName"
          name="surname"
          register={register}
          error={errors}
          placeholder="Last Name"
          type="text"
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ParentFormSchema>
          label="Email"
          name="email"
          register={register}
          error={errors}
          placeholder="Email"
          type="email"
        />

        <InputField<ParentFormSchema>
          label="Phone"
          name="phone"
          register={register}
          error={errors}
          placeholder="Phone"
          type="text"
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField<ParentFormSchema>
          label="Address"
          name="address"
          register={register}
          error={errors}
          placeholder="Address"
          type="text"
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        {/* <div className="flex flex-col gap-2 w-ful md:w-1/4">
        <label className="text-sm font-medium text-gray-500 gap-2 cursor-pointer" htmlFor="img">
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
      </div> */}
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
