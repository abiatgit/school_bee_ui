import React from "react";
import CountChartContainer from "@/components/CountChartContainer";
import UserCard from "@/components/UserCard";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import FinanceChart from "@/components/FinanceChart";
import EventCalender from "@/components/EventCalender";
import Announcements from "@/components/Announcements";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCard */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        {/* Middle chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* countChart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* attendanceChart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* Bottom chart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
