import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { role,resultsData } from "@/lib/data";
import FormModel from "@/components/FormModel";

type LessonType = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
  Date: string;
  score: number;
  student: string;
  type: string;
};

const columns = [
  {
    headers: "Subject",
    accessor: "subject",
   
  },
  {
    headers: "Student",
    accessor: "student",

    
  },
  {
    headers: "Score",
    accessor: "score",
    
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    headers: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    headers: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];

const ResultsListPage = () => {
  const resultRow = (item: LessonType) => {
    return (
      <tr
        key={item.id}
        className="boder-b border-gray-200 even:bg-slate-50 text-xs hover:bg-abiPurpleLight"
      >
        <td className="flex items-center gap-2 p-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{item.subject}</h3>
          </div>
        </td>
<td className="">{item.student}</td>
        <td className="">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacher}</td>
        <td className="hidden md:table-cell">{item.class}</td>
        <td className="hidden lg:table-cell">{item.date}</td>
        <td>
          <div className="flex items-center gap-2">
  
            {role === "admin" && (
             <>
             <FormModel table="result" type="delete" data={item} />
             <FormModel table="result" type="update" data={item} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
             <FormModel table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={resultRow} data={resultsData} />
      {/* pagination */}

      <Pagination />
    </div>
  );
};

export default ResultsListPage;
