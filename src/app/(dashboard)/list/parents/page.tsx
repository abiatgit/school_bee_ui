import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role, parentsData } from "@/lib/data";
import FormModel from "@/components/FormModel";

type ParentType = {
  id: number;
  name: string;
  students: string[];
  phone?: string;
  email?: string;
  address?: string;
};

const columns = [
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

  {
    headers: "Actions",
    accessor: "actions",
  },
];

const ParentsListPage = () => {
  const parentRow = (item: ParentType) => {
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
        <td className="hidden md:table-cell">{item.students.join(",")}</td>
        <td className="hidden md:table-cell">{item.phone}</td>

        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
          
              {role === "admin" && (
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
            {role === "admin" && (
             <FormModel table="parent" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={parentRow} data={parentsData} />
      {/* pagination */}

      <Pagination />
    </div>
  );
};

export default ParentsListPage;
