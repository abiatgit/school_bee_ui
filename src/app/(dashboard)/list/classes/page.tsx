import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role } from "@/lib/data";
import FormModel from "@/components/FormModel";
import { Class, Prisma, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";

type ClassType = Class & { superVisor: Teacher };

const columns = [
  {
    headers: "Class Name",
    accessor: "name",
  },
  {
    headers: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    headers: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    headers: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];

const classRow = (item: ClassType) => {
  return (
    <tr
      key={item.id}
      className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
    >
      <td className="flex items-center gap-2 p-4">{item.title}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.title[0]}</td>
      <td className="hidden md:table-cell">{item.superVisor.name + " " + item.superVisor.surname}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel
                table="class"
                type="delete"
                data={item}
                id={item.id.toString()}
              />
              <FormModel table="class" type="update" data={item} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.ClassWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId =value as string
            break;
          case "search":
            query.supervisorId = {
              contains: value as string,
              mode: "insensitive",
            };
            break;
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          superVisor : true,
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }),

      prisma.class.count({
        where: query,
      }),
    ]);

    return (
      <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
        {/* top */}
        <div className="flex justify-between items-center">
          <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/filter.png" alt="add" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/sort.png" alt="add" width={14} height={14} />
              </button>
              {role === "admin" && <FormModel table="class" type="create" />}
            </div>
          </div>
        </div>
        {/* List */}

        <Table columns={columns} renderRow={classRow} data={data} />
        {/* pagination */}

        <Pagination page={p} count={count} />
      </div>
    );
  }
};
export default ClassesListPage;
