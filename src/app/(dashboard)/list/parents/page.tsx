import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import FormModel from "@/components/FormModel";
import { Parent, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";

type ParentList = Parent & { Students: Student[] };

const ParentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const baseColumns = [
    {
      headers: "Info",
      accessor: "info",
    },
    {
      headers: "Student Name",
      accessor: "studentName",
      className: "hidden md:table-cell",
    },
    {
      headers: "Phone",
      accessor: "phone",
      className: "hidden md:table-cell",
    },
    {
      headers: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
  ];

  const columns =
    role === "admin"
      ? [...baseColumns, { headers: "Actions", accessor: "actions" }]
      : baseColumns;

  const parentRow = (item: ParentList) => {
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
        <td className="hidden md:table-cell">
          {item.Students.map((student) => student.name).join("")}
        </td>
        <td className="hidden md:table-cell">{item.phone}</td>

        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" ? (
              <>
                <FormModel
                  table="parent"
                  type="update"
                  data={item}
                  id={item.id.toString()}
                />

                <FormModel
                  table="parent"
                  type="delete"
                  data={item}
                  id={item.id.toString()}
                />
              </>
            ) : null}
          </div>
        </td>
      </tr>
    );
  };

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.ParentWhereInput = {};
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
      prisma.parent.findMany({
        where: query,
        include: {
          Students: true,
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }),

      prisma.parent.count({
        where: query,
      }),
    ]);

    return (
      <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
        {/* top */}
        <div className="flex justify-between items-center">
          <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/filter.png" alt="add" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
                <Image src="/sort.png" alt="add" width={14} height={14} />
              </button>
              {role === "admin" && <FormModel table="parent" type="create" />}
            </div>
          </div>
        </div>
        {/* List */}

        <Table columns={columns} renderRow={parentRow} data={data} />
        {/* pagination */}

        <Pagination count={count} page={p} />
      </div>
    );
  }
};
export default ParentsListPage;
