"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "#ffffff",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#C3EBFA",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4 ">
      {/* Title */}
      <div className="flex items-center justify-between ">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="moreData" width={20} height={20} />
      </div>
      {/* Chart */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src={"/maleFemale.png"} alt="card" height={50} width={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></Image>
      </div>
      {/* Bottom */}
      <div className="flex gap-16  justify-center">
        <div className="flex flex-col gap-1">
          <div className="bg-abiSkyLight rounded-full w-5 h-5" />
          <h1 className="font-bold">1,300</h1>
          <h2 className="text-xs text-gray-300">Boys(55%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="bg-abiYellow rounded-full w-5 h-5" />
          <h1 className="font-bold">1,300</h1>
          <h2 className="text-xs text-gray-300">Girls(55%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
