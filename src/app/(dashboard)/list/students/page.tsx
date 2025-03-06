import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role, studentsData } from "@/lib/data";
import FormModel from "@/components/FormModel";
import Link from "next/link";

type StudentType = {
  id: number;
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    headers: "Info",
    accessor: "info",
  },
  {
    headers: "StudentID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    headers: "Grade",
    accessor: "grade",
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

const StudentsListPage = () => {
  const studentRow = (item: StudentType) => {
    return (
      <tr
        key={item.id}
        className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
      >
        <td className="flex items-center gap-2 p-4">
          <Image
            src={item.photo}
            alt={item.name}
            width={32}
            height={32}
            className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.class}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.studentId}</td>
        <td className="hidden md:table-cell">{item.grade}</td>
        <td className="hidden lg:table-cell">{item.phone}</td>
        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/students/${item.id}`} className="text-blue-500">
              <button className="p-3 rounded-full flex items-center justify-center bg-abiSky w-6,h-6">
                <Image src="/view.png" alt="edit" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <FormModel
                table="student"
                type="delete"
                id={item.id.toString()}
              />
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
      {/* top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              //   <Image src="/plus.png" alt="add" width={14} height={14} />
              // </button>
              <FormModel table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={studentRow} data={studentsData} />
      {/* pagination */}

      <Pagination count={studentsData.length} page={1} />
    </div>
  );
};

export default StudentsListPage;
