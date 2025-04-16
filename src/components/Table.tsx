import React from "react";

const Table = ({
  columns,
  renderRow,
  renderActions,
  data,
}: {
  columns: { headers: string; accessor: string; className?: string }[];
  renderRow: (item: never) => React.ReactElement;
  renderActions?: (item: never) => React.ReactNode;
  data: never[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left border-gray-200 text-sm">
          {columns.map((column) => (
            <th key={String(column.accessor)} className={column.className}>
              {column.headers}
            </th>
          ))}
          {renderActions && <th></th>}
        </tr>
      </thead>

      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
