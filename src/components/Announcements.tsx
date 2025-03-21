import React from "react";

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-500">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        
        <div className="bg-abiSkyLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              Lorem lias, odio ducimus, repellat.
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1">
              2025-02-25
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>

        <div className="bg-abiPurpleLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              Lorem lias, odio ducimus, repellat.
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1">
              2025-02-25
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>

        <div className="bg-abiYellowLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              Lorem lias, odio ducimus, repellat.
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1">
              2025-02-25
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>


      </div>
    </div>
  );
};

export default Announcements;
