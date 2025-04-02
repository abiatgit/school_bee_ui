import React from 'react'
import { Student, Class } from "@prisma/client";
import prisma from '@/lib/prisma';

type StudentWithClass = Student & {
  class: Class;
};

const StudentAttendenceCard = async({ student }: { student: StudentWithClass }) => {

    const attendance = await prisma.attendance.findFirst({
        where: {
          studentId: student.id,
          date: {
            gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          },
        },
      });
console.log("attendance.length",attendance)      
  return (
    <div>
        <div>
        {attendance?.date ? <h3>{new Date(attendance.date).toLocaleDateString()}</h3> :<h3> No attendance record </h3> }
               {attendance.present? <span className="text-sm text-greeb-400">Present Today</span> :<span className="text-sm text-greeb-400">Absent Today</span> }
              
              </div>
    </div>
  )
}

export default StudentAttendenceCard
