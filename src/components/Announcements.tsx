"use client";

import React from "react";
interface AnnouncementProp {
  data: {
    id: string;
    title: string;
    description: string;
    date: Date;
  }[];
}

const Announcements = ({ data }: AnnouncementProp) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div className={`rounded-md p-4 ${index === 0 ? 'bg-abiYellow' : index === 1 ? 'bg-abiPurple' : 'bg-abiSky'}`} key={item.id}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {item.title}
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1">
              {item.date.toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
