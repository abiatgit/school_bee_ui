"use client";

import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

interface FormModelProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "attendance"
    | "result"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}

const FormModel = ({ table, type, data, id }: FormModelProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-abiYellow"
      : type === "update"
      ? "bg-abiSky"
      : "bg-abiPurple";
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const From = () => {
    return type === "delete" && id ? (
      <form action={""} className="flex flex-col gap-4 p-4">
        <span className="text-center text-lg font-medium">
          Are you sure you want to delete this {table}?
        </span>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-md border-none w-max self-center
        "
        >
          Delete
        </button>
      </form>
    ) : (
     <TeacherForm type={"create"} data={data}/>
    );
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
      >
        <Image src={`/${type}.png`} alt="icon" width={16} height={16}></Image>
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <From />
            <div
              onClick={handleClose}
              className="absolute top-5 right-4 cursor-pointer"
            >
              <Image src="/close.png" alt="close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;
