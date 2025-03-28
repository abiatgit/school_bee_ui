import React from 'react'
import FormModel from './FormModel';
import prisma from '@/lib/prisma';

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

const FormContainer = async({ table, type, data, id }:FormModelProps ) => {
    console.log("table",table,"id",id, "grade",)
    let relatedData = {};
    if(type !== "delete"){
        switch(table){
            case "subject":
               
                const subjectTeacher = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true }
                });
                relatedData = { teachers: subjectTeacher };
                break;
            case "class":
                const classGrade = await prisma.grade.findMany({
                    select: { id: true, level: true }
                });

                const classTeacher = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true }
                });
              
                relatedData = { teachers: classTeacher, grades: classGrade };
    
                break;
                case "teacher":
                    const teacherSubject = await prisma.subject.findMany({
                        select: { id: true, name: true }
                    });

                  
                    relatedData = { subjects:teacherSubject };
            default:
                break;
        }
    }
   
    return (
        <div>
            <FormModel table={table} type={type} data={data} id={id} relatedData={relatedData} />
        </div>
    );
}

export default FormContainer
