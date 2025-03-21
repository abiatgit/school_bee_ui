"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventCalender() {
  
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();
  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString()}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
}
