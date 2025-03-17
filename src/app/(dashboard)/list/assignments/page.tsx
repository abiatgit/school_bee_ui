import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import FormModel from "@/components/FormModel";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";
import {role} from "@/lib/data"



type AssignmentType = Assignment& {
  lesson: 
  { Subject: Subject; 
    Class: Class; 
    teacher: Teacher };
};

const columns = [
  {
    headers: "Subject",
    accessor: "subject",
  },
  {
    headers: "Class",
    accessor: "class",
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    headers: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },

  (role==="admin" || role==="teacher" && {
    headers: "Actions",
    accessor: "actions",
  }),
];

const examRow = (item: AssignmentType) => {
  return (
    <tr
      key={item.id}
      className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
    >
      <td className="flex items-center gap-2 p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">{item.lesson.Subject.name}</h3>
        </div>
      </td>
      <td className="">{item.lesson.Class.title}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModel
                table="exam"
                type="delete"
                data={item}
                id={item.id.toString()}
              />
              <FormModel table="exam" type="update" data={item} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.AssignmentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = {
              classId: parseInt(Array.isArray(value) ? value[0] : value),
            };
            break;
          case "teacherId":
            query.lesson = {
              teacherId: Array.isArray(value) ? value[0] : value,
            };
            break;
          case "search":
            const searchValue = Array.isArray(value) ? value[0] : value;
            query.lesson = {
              Subject: {
                name: { contains: searchValue, mode: "insensitive" },
              },
            };
            break;
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.assignment.findMany({
        where: query,
        include: {
          lesson: {
            select: {
              Subject: { select: { name: true } },
              Class: { select: { title: true } },
              teacher: { select: { name: true } }
            },
          },
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }),

      prisma.assignment.count({
        where: query,
      }),
    ]);

    return (
      <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
        {/* top */}
        <div className="flex justify-between items-center">
          <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/filter.png" alt="add" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/sort.png" alt="add" width={14} height={14} />
              </button>
              {role === "admin" && <FormModel table="exam" type="create" />}
            </div>
          </div>
        </div>
        {/* List */}

        <Table columns={columns } renderRow={examRow} data={data} />
        {/* pagination */}

        <Pagination page={p} count={count} />
      </div>
    );
  }
};
export default AssignmentListPage
