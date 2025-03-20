import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import FormModel from "@/components/FormModel";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
type LessonType = Lesson & { teacher: Teacher } & { Subject: Subject } & {
  Class: Class;
};

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { sessionClaims} = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  const baseColumns = [
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
  ];
  const columns = role === "admin" || role === "teacher" ? [...baseColumns, { headers: "Actions", accessor: "actions" }] : baseColumns;
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
        <td className="hidden md:table-cell">
          {item.teacher.name + " " + item.teacher.surname}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModel table="lesson" type="update" data={item} />
                <FormModel
                  table="lesson"
                  type="delete"
                  data={item}
                  id={item.id.toString()}
                />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };
  const { page, ...queryParams } = await searchParams;
  console.log(`query param ${queryParams.search}`);
  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    if (queryParams.search) {
      const searchValue = Array.isArray(queryParams.search)
        ? queryParams.search[0]
        : queryParams.search;
      query.OR = [
        { Subject: { name: { contains: searchValue, mode: "insensitive" } } },
        { teacher: { name: { contains: searchValue, mode: "insensitive" } } },
      ];
    }

    if (queryParams.classId) {
      query.classId = parseInt(queryParams.classId as string);
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        Subject: { select: { name: true } },
        Class: { select: { title: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: PAGE_SIZE,
      skip: (p - PAGE_NUMBER) * PAGE_SIZE,
    }),

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
            {(role === "admin" || role === "teacher") && (
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

export default LessonsListPage;
