"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";



const CountChart = ({boys,girls}:{boys:number,girls:number}) => {
  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "#ffffff",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
  ];
  return (
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
  );
};

export default CountChart;
