"use client";
import { PAGE_SIZE } from "@/lib/settings";
import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ count, page }: { count: number; page: number }) => {

  const router = useRouter();
  const hasPrev = PAGE_SIZE * (page - 1) > 0;
  const hasNext = PAGE_SIZE * (page - 1) + PAGE_SIZE < count;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="flex items-center p-4 justify-between w-full text-gray-500 ">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.ceil(count / PAGE_SIZE) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                page === pageIndex
                  ? "bg-abiSky text-white"
                  : "bg-slate-200 text-gray-500"
              }`}
              onClick={() => handlePageChange(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
