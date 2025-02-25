"use client";

import Image from "next/image";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 40,
    absent: 24,
  },
  {
    name: "Tue",
    present: 30,
    absent: 13,
  },
  {
    name: "Wed",
    present: 20,
    absent: 9,
  },
  {
    name: "Thu",
    present: 27,
    absent: 39,
  },
  {
    name: "Fri",
    present: 18,
    absent: 4,
  },
  
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg  h-full p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20}></Image>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"#637381"}}/>
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{borderColor:"#EDEDED",borderRadius:"10px"}} />
          <Legend verticalAlign="top" align="left" height={36} wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}} />
          <Bar
            dataKey="present"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#FAE27C" 
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
