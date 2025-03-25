import prisma from "@/lib/prisma";
import React from "react";
import BigCalender from "./BigCalender";
import { Lesson } from "@prisma/client";

const BigCalenderContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classID";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });
  const data = dataRes.map((lesson: Lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime
  }));

  console.log("Big Calander", data);
  return (
    <div>
      <BigCalender data={data}></BigCalender>
    </div>
  );
};

export default BigCalenderContainer;
