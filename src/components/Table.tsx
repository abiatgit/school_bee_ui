import React from "react";

interface TableProps {
  columns: {
    headers: string;
    accessor: string;
    className?: string;
  }[];
}

const Table = ({ columns }: TableProps) => {
  return <table className="w-full mt-4">

    <thead>
        <tr  className=" text-left border-gray-200 text-sm">
            {columns.map((column) => (
                <th key={column.accessor} className={`${column.className}`} >{column.headers}</th>
            ))}
        </tr>
    </thead>
  </table>;
};

export default Table;
