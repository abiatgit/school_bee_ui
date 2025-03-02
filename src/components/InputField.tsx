"use client"
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";


type InputFieldProps = {
  label: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  defaultValue: string;
  errors: FieldErrors;
  placeholder: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};
const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  errors,
  placeholder,
  inputProps
}: InputFieldProps) => {



  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-sm text-gray-500 ">{label}</label>
      <input
        type={type}
        {...register({name})}
        className="ring-[1.5px] ring-gray-300 rounded-md p-2"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...inputProps}
      />
      {errors?.message && (
        <p className="text-red-500 text-xs">{errors.message}</p>
      )}

      <input type="text" {...register("username")} />
    </div>
  );
};

export default InputField;
