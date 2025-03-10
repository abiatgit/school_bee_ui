import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role} from "@/lib/data";
import FormModel from "@/components/FormModel";
import { Prisma, Subject ,Teacher} from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";

type SubjectType =Subject & {Teachers:Teacher[]}

const columns = [
  {
    headers: "Subject Name",
    accessor: "subjectName",

  },
  {
    headers: "Teacher Name",
    accessor: "teacherName",
    className: "hidden md:table-cell",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];

const subjectRow = (item: SubjectType) => {
  return (
    <tr
      key={item.id}
      className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
    >
      <td className="flex items-center gap-2 p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.Teachers.map((teacher)=>teacher.name).join(",")}</td>

      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/teachers/${item.id}`} className="text-blue-500">
            <button className="p-3 rounded-full flex items-center justify-center bg-abiSky w-7,h-7">
              <Image src="/edit.png" alt="edit" width={16} height={16} />
            </button>
          </Link> */}
          {role === "admin" && (
            <>
            <FormModel table="subject" type="delete" data={item} id={item.id.toString()}/>
            <FormModel table="subject" type="update" data={item} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
const SubjectsListPage =async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.SubjectWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = {
              contains: value as string,
              mode: "insensitive",
            };
            break;
        }
      }
    }



    const [data, count] = await prisma.$transaction([
      prisma.subject.findMany({
        where: query,
        include: {
         Teachers:true
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }),

      prisma.subject.count({
        where: query,
      }),
    ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
      {/* top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
            <FormModel table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={subjectRow} data={data} />
      {/* pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
};} 

export default SubjectsListPage;
