import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";

const columns = [
      {
        headers:"Info",accessor:"info"
      },
      {
        headers:"Teacher ID",accessor:"teacherId",className:"hidden md:table-cell"
      },
      {
        headers:"Subjects",accessor:"subjects",className:"hidden md:table-cell"
      },
      {
        headers:"Classes",accessor:"classes",className:"hidden md:table-cell"
      },
      {
        headers:"Phone",accessor:"phone",className:"hidden lg:table-cell"
      },
      {
        headers:"Address",accessor:"address",className:"hidden lg:table-cell"
      },
      {
        headers:"Actions",accessor:"actions",className:"hidden md:table-cell"
      },
];

const TeachersList = () => {
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
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              <Image src="/class.png" alt="add" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} />
      {/* pagination */}

      <Pagination />
    </div>
  );
};

export default TeachersList;
