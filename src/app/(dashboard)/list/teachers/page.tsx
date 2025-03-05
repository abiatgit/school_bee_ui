import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { role, } from "@/lib/data";
import FormModel from "@/components/FormModel";
import { Teacher, Subject, Class } from "@prisma/client";
import prisma from "@/lib/prisma";

type TeacherList = Teacher & {subjects: Subject[], classes: Class[]}


const columns = [
  {
    headers: "Info",
    accessor: "info",
  },
  {
    headers: "TeacherID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    headers: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    headers: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    headers: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];

const teacherRow = (item: TeacherList) => {
  return (
    <tr
      key={item.id}
      className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
    >
      <td className="flex items-center gap-2 p-4">
        <Image
          src={item.image || "/noAvatar.png"}
          alt={item.name}
          width={32}
          height={32}
          className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.subjects.map((subject)=>subject.name).join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.map((clas)=>clas.title).join(",")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`} className="text-blue-500">
            <button className="p-3 rounded-full flex items-center justify-center bg-abiSky w-7,h-7">
              <Image src="/view.png" alt="edit" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="p-3 flex items-center justify-center rounded-full bg-abiPurple w-7,h-7">
            //   <Image src="/delete.png" alt="edit" width={16} height={16} />
            // </button>
            <FormModel table="teacher" type="delete" data={item} id={item.id.toString()}/>
          )}
        </div>
      </td>
    </tr>
  );
};
const TeachersListPage =async ({searchParams}: {[key:string]: string | undefined}) => {
console.log(`SearchParams: ${searchParams}`)

  const data = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
    take: 10,
 
  });
  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
      {/* top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Teachers List</h1>
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
              <FormModel table="teacher" type="create"/>
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              //   <Image src="/plus.png" alt="add" width={14} height={14} />
              // </button>
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={teacherRow} data={data} />
      {/* pagination */}

      <Pagination />
    </div>
  );
};

export default TeachersListPage;
