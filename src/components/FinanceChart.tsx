"use client";
import React from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expence: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expence: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expence: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expence: 3908,
  },
  {
    name: "May",
    income: 1890,
    expence: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expence: 3800,
  },
  {
    name: "Jul ",
    income: 3490,
    expence: 4300,
  },
  {
    name: "Aug",
    income: 2390,
    expence: 3800,
  },
  {
    name: "Sep",
    income: 3490,
    expence: 4300,
  },
  {
    name: "Oct",
    income: 2390,
    expence: 3800,
  },
  {
    name: "Nov",
    income: 3490,
    expence: 4300,
  },
  {
    name: "Dec",
    income: 2390,
    expence: 3800,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20}></Image>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#637381" }}
          />
          <YAxis 
           axisLine={false}
           tickLine={false} 
           tick={{ fill: "#637381" }}
           tickMargin={10} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingLeft: "40px" }}
            iconType="circle"
            iconSize={10}
            
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={5}
            dot={false}
          />
          <Line type="monotone" dataKey="expence" stroke="#FAE27C"  strokeWidth={5}
            dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
