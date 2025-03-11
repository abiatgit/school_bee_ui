import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role } from "@/lib/data";
import FormModel from "@/components/FormModel";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";

type LessonType = Lesson &{teacher:Teacher} &{Subject:Subject} & {Class:Class}

const columns = [
  {
    headers: "Subject Name",
    accessor: "subject",
   
  },
  {
    headers: "Class",
    accessor: "class",
    className: "hidden sm:table-cell",
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];

const lessonRow = (item: LessonType) => {
  return (
    <tr
      key={item.id}
      className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
    >
      <td className="flex items-center gap-2 p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">{item.Subject.name}</h3>
        </div>
      </td>
      <td className="">{item.Class.title}</td>


      <td className="hidden md:table-cell">{item.teacher.name +" "+ item.teacher.surname}</td>
      <td>
        <div className="flex items-center gap-2">
      
          {role === "admin" && (
            <>
            <FormModel table="lesson" type="update" data={item} />
         <FormModel table="lesson" type="delete" data={item} id={item.id.toString()}/>
         </>
          )}
        </div>
      </td>
    </tr>
  );
};
const LessonsListPage =  async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId =value as string
            break;
          case "search":
            query.teacherId = {
              contains: value as string,
              mode: "insensitive",
            };
            break;
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          Subject : {select:{name:true}},
          Class: {select:{title:true}},
          teacher: {select:{name:true,surname:true}}
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }) ,

      prisma.lesson.count({
        where: query,
      }),
    ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
      {/* top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              <Image src="/filter.png" alt="add" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              <Image src="/sort.png" alt="add" width={14} height={14} />
            </button>
            {role === "admin" && (
              <>

              <FormModel table="lesson" type="create" />
              </>
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={lessonRow} data={data} />
      {/* pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
};
}
export default LessonsListPage;
