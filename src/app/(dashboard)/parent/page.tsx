import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import React from "react";

const ParentPage = () => {
  return (
    <div className="flex-1  p-4 flex flex-col gap-4 xl:flex-row">
      {/* <LeftSidebar /> */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-2xl font-semibold">Schedule (Ancy Abi)(4A)</h1>
          <BigCalender />
        </div>
      </div>
      {/* <Right/> */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
