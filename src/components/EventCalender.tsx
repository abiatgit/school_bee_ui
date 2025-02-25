"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

//Temp Events

const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur.",
    time: "10:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur.",
    time: "10:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur.",
    time: "10:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function EventCalender() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white rounded-md p-4">
      <Calendar onChange={onChange} value={value} />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold my-4">Events</h3>
        <Image src="/moreDark.png" alt="arrow-right" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => {
          return (
            <div className="p-5 rounded-md bg-gray-100 border-2 border-gray-100 border-t-4 odd:border-abiSky even:border-abiPurple" key={event.id}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <span className="text-xs text-gray-300">{event.time}</span>
              </div>
              <p className=" mt-2 text-sm text-gray-400">{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
