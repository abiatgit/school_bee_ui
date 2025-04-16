import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { Announcement, Class, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/FormContainer";

type AnnouncementType = Announcement & {
  class: Class;
};

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const resolvedSearchParams = await searchParams;

  const baseColumns = [
    {
      headers: "Title",
      accessor: "title",
    },
    {
      headers: "Class",
      accessor: "class",
    },
    {
      headers: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    }
  ];

  const columns = role === "admin"
    ? [...baseColumns, { headers: "Actions", accessor: "actions" }]
    : baseColumns;
  const announcementRow = (item: AnnouncementType) => {
   
    return (
      <tr
        key={item.id}
        className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
      >
        <td className="flex items-center gap-2 p-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{item.title}</h3>
          </div>
        </td>
        <td className="">{item.description}</td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormContainer table="announcement" type="update" data={item} />
                <FormContainer table="announcement" type="delete" data={item} id={item.id.toString()} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };
  const { page, ...queryParams } = resolvedSearchParams;

  const p = page ? parseInt(page as string) : 1;
  // URL PARAM CONVERSION
  const query: Prisma.AnnouncementWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = {
              contains: value as string,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }

    const roleCondition = {
      teacher: { lessons: { some: { teacherId: userId as string } } },
      student: { students: { some: { id: userId as string } } },
      parent: { students: { some: { parentId: userId as string } } }
    }
    query.OR = [
      { classId: undefined },
      { class: roleCondition[role as keyof typeof roleCondition] || {} }
    ]

    const [data, count] = await prisma.$transaction([
      prisma.announcement.findMany({
        where: query,
        include: {
          class: true,
        },
        take: PAGE_SIZE,
        skip: (p - PAGE_NUMBER) * PAGE_SIZE,
      }),
      prisma.announcement.count({
        where: query,
      }),
    ]);

    return (
      <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
        {/* top */}
        <div className="flex justify-between items-center">
          <h1 className="hidden md:block text-lg font-semibold">
            All Announcements
          </h1>
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
                <FormContainer table="announcement" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* List */}

        <Table columns={columns} renderRow={announcementRow} data={data} />

        {/* pagination */}

        <Pagination page={p} count={count} />
      </div>
    );
  }
};
