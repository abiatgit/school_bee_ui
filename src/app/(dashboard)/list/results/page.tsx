import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import FormModel from "@/components/FormModel";
import { Prisma, Result } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";

type ResultRowType = {
  id: number;
  title: string;
  student: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  class: string;
  startTime: Date;
};

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { sessionClaims, userId: currentUserId } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const baseColumns = [
    {
      headers: "Title",
      accessor: "title",
    },
    {
      headers: "Student",
      accessor: "student",
    },
    {
      headers: "Score",
      accessor: "score",
    },
    {
      headers: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      headers: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      headers: "Date",
      accessor: "date",
      className: "hidden lg:table-cell",
    },
 
  ];
  const columns =
    (role === "admin" || role === "teacher")
      ? [...baseColumns, { headers: "Actions", accessor: "actions" }]
      : baseColumns;

      const resultRow = (item: ResultRowType) => {
        return (
          <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
          >
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.student + " " + item.studentSurname}</td>
            <td className="hidden md:table-cell">{item.score}</td>
            <td className="hidden md:table-cell">
              {item.teacherName + " " + item.teacherSurname}
            </td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden md:table-cell">
              {new Intl.DateTimeFormat("en-US").format(item.startTime)}
            </td>
            <td>
              <div className="flex items-center gap-2">
                {(role === "admin" || role === "teacher") && (
                  <>
                    <FormModel table="result" type="update" data={item} />
                    <FormModel table="result" type="delete" id={item.id} />
                  </>
                )}
              </div>
            </td>
          </tr>
        );
      };
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAM CONVERSION
  const query: Prisma.ResultWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = Array.isArray(value) ? value[0] : value;
            break;
       
          case "search":
            const searchValue = Array.isArray(value) ? value[0] : value;
            query.OR = [
              {
                exam: {
                  title : {
                    contains: searchValue,
                    mode: "insensitive",
                  },
                },
              },
              {
                student: {
                  name: {
                    contains: searchValue,
                    mode: "insensitive",
                    },
                  },
                },
              
            ];
            break;
        }
      }
    }
  }
  // Role condition
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        {
          exam: {
            lesson: {
              teacherId: currentUserId as string,
            },
          },
          assignment: {
            lesson: {
              teacherId: currentUserId as string,
            },
          },
        },
      ];
      break;
    case "student":
      query.studentId = currentUserId as string;
      break;
    case "parent":
      query.student = {
        parentId: currentUserId as string,
      };
      break;
    default:
      break;
  }
  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: { name: true, surname: true },
        },
        exam: {
          include: {
            lesson: {
              select: {
                Class: { select: { title: true } },
                teacher: { select: { name: true, surname: true } },
                Subject: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                Class: { select: { title: true } },
                teacher: { select: { name: true, surname: true } },
                Subject: { select: { name: true } },
              },
            },
          },
        },
      },
      take: PAGE_SIZE,
      skip: (p - PAGE_NUMBER) * PAGE_SIZE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataRes.map((item: Result & {
    student: { name: string; surname: string };
    exam?: { 
      title: string; 
      startTime: Date;
      lesson: { 
        Class: { title: string }; 
        teacher: { name: string; surname: string }; 
      } 
    };
    assignment?: { 
      title: string; 
      startDate: Date;
      lesson: { 
        Class: { title: string }; 
        teacher: { name: string; surname: string }; 
      } 
    };
  }) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      student: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      class: assessment.lesson.Class.title,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  }).filter((item: ResultRowType | null): item is ResultRowType => item !== null);

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0 m-4">
      {/* top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              <Image src="/filter.png" alt="add" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-abiYellow">
              <Image src="/sort.png" alt="add" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModel table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={resultRow} data={data} />
      {/* pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
};

export default ResultsListPage;
