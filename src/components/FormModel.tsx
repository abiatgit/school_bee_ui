"use client";
import React, { startTransition, useActionState, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
import dynamic from "next/dynamic";
import { deleteClass, deleteSubject } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormModelProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  // class: deleteClass,
  // teacher: deleteTacher,
  // parent: deleteParent,
  // announcement: deleteAnnouncement,
  // event: deleteEvent,
  // lesson: deleteLesson,
  // result: deleteResult,
  // student: deleteTeacher,
  // exam: deleteExam,
  // assignment: deleteAssignment,
  // attendance: deleteAttendance,
};

const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <div>Loading...</div>,
});
const SubjectForm = dynamic(() => import("./forms/SubjuctForm"), {
  loading: () => <div>Loading...</div>,
});
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <div>Loading...</div>,
});
// const ParentForm = dynamic(() => import("./forms/ParentForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const SubmitForm = dynamic(() => import("./forms/SubmitForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const LessonForm = dynamic(() => import("./forms/LessonForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const ExamForm = dynamic(() => import("./forms/ExamForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const ResultForm = dynamic(() => import("./forms/ResultForm"), {
//   loading: () => <div>Loading...</div>,
// });
// const EventForm = dynamic(() => import("./forms/EventForm"), {
//   loading: () => <div>Loading...</div>,
// });

const forms: {
  [key: string]: (
    type: "create" | "update",
    relatedData?: any,
    data?: any,
    setOpen?: (state: boolean) => void
  ) => React.ReactElement;
} = {
  teacher: (type, relatedData, data, setOpen) => (
    <TeacherForm type={type}   relatedData={relatedData} data={data} setOpen={setOpen!} />
  ),
  // student: (type, relatedData, data) => <StudentForm type={type} data={data} />,
  // parent: (type, relatedData, data,setOpen) => <ParentForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData}/>,
  class: (type, relatedData, data, setOpen) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen!}
      relatedData={relatedData}
    />
  ),
  subject: (type, relatedData, data, setOpen) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen!}
      relatedData={relatedData}
    />
  ),
  // announcement: (type, relatedData, data) => <AnnouncementForm type={type} data={data} />,
  // attendance: (type, relatedData, data) => <AttendanceForm type={type} data={data} />,
  // submit: (type, relatedData, data) => <SubmitForm type={type} data={data} />,
  // lesson: (type, relatedData, data) => <LessonForm type={type} data={data} />,
  // exam: (type, relatedData, data) => <ExamForm type={type} data={data} />,
  // assignment: (type, relatedData, data) => <AssignmentForm type={type} data={data} />,
  // result: (type, relatedData, data) => <ResultForm type={type} data={data} />,

  // event: (type, relatedData, data) => <EventForm type={type} data={data} />,
};

const FormModel = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormModelProps & { relatedData: any }) => {
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
    const router = useRouter();
    const deleteAction = deleteActionMap[table as keyof typeof deleteActionMap];
    const [state, formAction] = useActionState(deleteAction, {
      success: false,
      error: false,
    });
    useEffect(() => {
      if (state.success) {
        setOpen(false);
        router.refresh();
        toast.success(`Subject Has been Deleted`, { toastId: "success" });
      }
      if (state.error) {
        toast.error("Failed to Delete subject.", { toastId: "error" });
      }
    }, [state.success, state.error]);

    return type === "delete" && id ? (
      <form
        onSubmit={(e) => {
          console.log("Hello form  Delete class");
          e.preventDefault();
          startTransition(() => {
            formAction({ id: id.toString() });
          });
        }}
        className="flex flex-col gap-4 p-4"
      >
        <span className="text-center text-lg font-medium">
          Are you sure you want to delete this subject?
        </span>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-md border-none w-max self-center"
        >
          Delete
        </button>
      </form>
    ) : type === "update" || type === "create" ? (
      forms[table](type, relatedData, data, setOpen)
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
