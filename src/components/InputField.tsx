"use client"
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors, Path } from "react-hook-form";


type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  register: UseFormRegister<T>;
  name: keyof T;
  defaultValue?: string;
  error: FieldErrors<T>;
  placeholder: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?:boolean
};
const InputField = <T extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  placeholder,
  inputProps,
  hidden

}: InputFieldProps<T>) => {



  return (
    <div className={hidden ? "hidden":"flex flex-col gap-2 w-ful md:w-1/4"}>
    <label >{label}</label>
    <input
      type={type}
      {...register(name as Path<T>)}
      className="ring-[1.5px] ring-gray-300 rounded-md p-2"
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...inputProps}
    />
    {error[name]?.message && (
      <p className="text-red-500 text-xs">{error[name]?.message as string}</p>
    )}
  </div>
  );
};

export default InputField;
