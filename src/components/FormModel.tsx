"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
 loading: () => <div>Loading...</div>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <div>Loading...</div>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <div>Loading...</div>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <div>Loading...</div>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <div>Loading...</div>,
});
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: () => <div>Loading...</div>,
});
const SubmitForm = dynamic(() => import("./forms/SubmitForm"), {
  loading: () => <div>Loading...</div>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <div>Loading...</div>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <div>Loading...</div>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <div>Loading...</div>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <div>Loading...</div>,
});
const SubjectForm = dynamic(() => import("./forms/SubjuctForm"), {
  loading: () => <div>Loading...</div>,
});

const forms: { [key: string]: (type: "create" | "update", data?: any) => React.ReactElement; } = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  submit: (type, data) => <SubmitForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
};

interface FormModelProps {
  table: keyof FormData | "parent" | "subject" | "class" | "lesson" | "exam" |"assignment" | "attendance" | "result" | "event"|"student" | "teacher" | "announcement";
  type: "create" | "update" | "delete" | "parent"
  data?: Partial<FormData[keyof FormData]>;
  id?: string | number
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
          Are you sure you want to delete this {"this"}?
        </span>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-md border-none w-max self-center
        "
        >
          Delete
        </button>
      </form>
    ) :type === "update" || type === "create" ? (
      forms[table](type, data)
    ) : null;
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
      >
        <Image src={`/${type}.png`} alt="icon" width={14} height={16}></Image>
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
