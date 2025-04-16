
import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const ParentPage =async () => {
  const {userId} = await auth();
  console.log("Student page userid", userId);
  const data = await prisma.class.findFirst({
   where: {
     students: {
       some: {
         id: userId!
       }
     }
   },
  });
  console.log('data form student page',data)
  return (
    <div className="flex-1  p-4 flex flex-col gap-4 xl:flex-row">
      {/* <LeftSidebar /> */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-2xl font-semibold">Schedule (Ancy Abi)(4A)</h1>
          <BigCalenderContainer type='classID' id={data?.id}/>
        </div>
      </div>
      {/* <Right/> */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <AnnouncementsContainer />
      </div>
    </div>
  );
};

export default ParentPage;
