"use client";
import { Calendar, globalizeLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from "globalize";
const localizer = globalizeLocalizer(globalize);
import { useState } from "react";
import { adjuestSheduletoCurrentWeek } from "@/lib/utils";

const BigCalender = ({data}:{data:{title:string,start:Date,end:Date}[]}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  function handleViewChange(view: View) {
    setView(view);
  }

  const schedule=adjuestSheduletoCurrentWeek(data)
  return (
    <Calendar
      localizer={localizer}
      events={schedule}
      startAccessor="start"
      endAccessor="end"
      view={view}
      views={["work_week", "day"]}
      style={{ height: "98%" }}
      onView={handleViewChange}
      min={new Date(2025, 0, 25, 8, 0)}
      max={new Date(2025, 0, 25, 17, 0)}
    />
  );
};

export default BigCalender;
