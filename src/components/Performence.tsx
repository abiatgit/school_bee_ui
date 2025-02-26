"use client";
import Image from "next/image";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "lightblue" },
  { name: "Group B", value: 8, fill: "lightyellow" },
];

export default function Performence() {
  return (
    <div className="bg-gray-100 rounded-md p-4 h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Performance</h1>
        <Image src={"/moreDark.png"} alt="abi" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">92%</h1>
          <p className="text-xs text-gray-500">Performance</p>
        </div>
        <h2 className="font-semibold absolute bottom-14 left-0 right-0 m-auto text-center"> 1st Semester</h2>
      </div>
    </div>
  );
}
