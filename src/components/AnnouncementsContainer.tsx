import React from "react";
import Announcements from "./Announcements";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Lesson, Student } from "@prisma/client";
import { format } from 'date-fns';

type AnnouncementWithRelations = Announcement & {
  class: (Class & {
    lessons?: Lesson[];
    students?: Student[];
  }) | null;
};
const AnnouncementsContainer = async () => {
  console.log("hello form announcemet")
  const { userId, sessionClaims } = await auth();

  type Role = "admin" | "parent" | "teacher" | "student";
  const role = (sessionClaims?.metadata as { role: Role })?.role;

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: {
      date: "desc",
    },
    include: {
      class: {
        include: {
          lessons: true,
          students: true,
        },
      },
    },
  }) as AnnouncementWithRelations[];

  const filteredData = data.filter((announcement: AnnouncementWithRelations) => {
    if (role === "admin") return true;
    if (!announcement.class) return true;
    
    switch (role) {
      case "teacher":
        return announcement.class.lessons?.some(
          (lesson: Lesson) => lesson.teacherId === userId
        );
      case "student":
        return announcement.class.students?.some(
          (student: Student) => student.id === userId
        );
      case "parent":
        return announcement.class.students?.some(
          (student: Student) => student.parentId === userId
        );
      default:
        return false;
    }
  });

  const transformedData = filteredData.map((announcement) => ({
    id: announcement.id.toString(),
    title: announcement.title,
    description: announcement.description,
    date: format(new Date(announcement.date), 'dd/MM/yyyy'),
  }));

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-500">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Announcements data={transformedData} />
      </div>
    </div>
  );
};

export default AnnouncementsContainer;
