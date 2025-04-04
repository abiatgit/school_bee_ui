import React from "react";
import FormModel from "./FormModel";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export interface FormModelProps {
  table:
    | Exclude<keyof FormData, symbol>
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "attendance"
    | "result"
    | "event"
    | "student"
    | "teacher"
    | "announcement";
  type: "create" | "update" | "delete" | "parent";
  data?: Partial<FormData[keyof FormData]>;
  id?: string | number;
}

const FormContainer = async ({ table, type, id,data }: FormModelProps) => {
  console.log("FORM DATA FOR EXAM PAGE",data)
  let relatedData;

if(type !== "delete"){
    switch (table) {
        case "subject":
          const subjectTeachers = await prisma.teacher.findMany({
            select: { id: true, name: true, surname: true },
          });
          relatedData = { teachers: subjectTeachers };
          break;
        case "class":
          const classGrades = await prisma.grade.findMany({
            select: { id: true, level: true },
          });
          const classTeachers = await prisma.teacher.findMany({
            select: { id: true, name: true, surname: true },
          });
          relatedData = { teachers: classTeachers, grades: classGrades };
          break;
        case "student":
          if (id) {
            data = await prisma.student.findUnique({
              where: { id },
              include: {
                class: true,
                Parents: true,
              },
            });
          }
          const studentGrade = await prisma.grade.findMany({
            select: { id: true, level: true },
          });
          const studentClass = await prisma.class.findMany({
            select: { id: true, title: true },
          });
          relatedData = { grades: studentGrade, class: studentClass };
          break;
        case "exam":
    
          const { userId, sessionClaims } = await auth();
          const role = (
            sessionClaims?.metadata as {
              role?: "admin" | "teacher" | "student" | "parent";
            }
          ).role;
    
          const Examlessons = await prisma.lesson.findMany({
            where: {
              ...(role === "teacher" ? { teacherId: userId } : {}),
            },
            select: {
              id: true,
              name: true,
              Subject: {
                select: {
                  id: true,
                  name: true,
                },
              },
              Class: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          });

          relatedData = { lessons: Examlessons };
      
          break;
        case "teacher":
        //   if (id) {
        //     data = await prisma.teacher.findUnique({
        //       where: { id },
        //       include: {
        //         subjects: true,
        //       },
        //     });
        //   }
    
          const teacherSubject = await prisma.subject.findMany({
            select: { id: true, name: true },
          });
          relatedData = { subjects: teacherSubject };
          break;
        default:
          break;
      }
}

  return (
    <div>
      <FormModel
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
