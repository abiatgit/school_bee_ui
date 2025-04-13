
import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import FormContainer from "@/components/FormContainer";
import Performence from "@/components/Performence";
import StudentAttendenceCard from "@/components/StudentAttendenceCard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Student, Class } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type StudentWithClass = Student & {
  class: Class;
};

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const student = (await prisma.student.findUnique({
    where: {
      id: params.id,
    },
    include: {
      class: true,
    },
  })) as StudentWithClass | null;
  console.log("Fetched data", student);
  if (!student) return "not found";
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* userInfo */}
          <div className="bg-abiSky py-6 px-4 rounded-md flex-1 flex gap">
            <div className="w-1/3">
              <Image
                src={
                  student.image ||
                  "https://imgs.search.brave.com/X5CsFSE3VbCLKEElurN6jMVNEX1Iv1S_46KXHEVy-FU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjA4/MDAyNzgwL3Bob3Rv/L2hhcHB5LXN0dWRl/bnQtYXQtdGhlLXNj/aG9vbC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9QUd0NjNL/TldHMnI4SlZ5MVda/NEMydmNYME45LURQ/ajZDNmJ4aFlNR3o0/OD0"
                }
                alt="teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover border-2 border-white shadow-lg "
              ></Image>
            </div>
            <div className="w-2/3 ms-4 flex flex-col justify-between gap-4">
              <h2 className="text-2xl font-semibold">{student?.name}</h2>
              {role === "admin" && (
                <FormContainer
                  table="student"
                  type="update"
                  id={student.id}
                  data={{
                    id: student.id,
                    username: student.username,
                    name: student.name,
                    surname: student.surname,
                    email: student.email,
                    phone: student.phone,
                    gender: student.gender.toLowerCase(),
                    address: student.address,
                    bloodGroup: student.bloodGroup,
                  }}
                />
              )}
              <p className="text-sm text-gray-500">
                Lorem, ipsum dolor sit amet conoluptatum dolorem ipsum illum
                enim
              </p>
              <div className="flex items-center gap-2 justify-between flex-wrap text-xs">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/blood.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <p>{student.bloodGroup}</p>
                </div>
                <div className="w-full  md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/date.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <span>Jan 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/mail.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <p>{student.email}</p>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/phone.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <p>{student.phone}</p>
                </div>
              </div>
            </div>
          </div>
          {/* smallCard */}
          <div className="flex-1 flex  justify-between gap-4 flex-wrap">
            {/* card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleAttendance.png"}
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              ></Image>
              <StudentAttendenceCard student={student} />
            </div>
            {/* card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleClass.png"}
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              ></Image>
              <div>
                <h1 className="text-2xl font-semibold">
                  {student.class.title}
                </h1>
                <span className="text-sm text-gray-400">
                  Grade {student.class.gradeId}
                </span>
              </div>
            </div>

            {/* card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleLesson.png"}
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              ></Image>
              <div>
                <h1 className="text-2xl font-semibold">5</h1>
                <span className="text-sm text-gray-400">lessons</span>
              </div>
            </div>
            {/* card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleClass.png"}
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              ></Image>
              <div>
                <h1 className="text-2xl font-semibold">10</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&rsquo; Schedule</h1>
          <BigCalenderContainer type="classID" id={student.class.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-2xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-500"
              href={`/list/teachers?classId=${1}`}
            >
              Student&rsquo; Teachers
            </Link>
            <Link
              className="p-3 cursor-pointer rounded-md bg-abiYellow text-gray-500"
              href={`/list/exams?classId=${1}`}
            >
              Student&rsquo; Exams
            </Link>
            <Link
              className="p-3 cursor-pointer rounded-md bg-abiPurple text-gray-500"
              href={`/list/lessons?classId=${2}`}
            >
              Student&rsquo; Lessons
            </Link>
            <Link
              className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-"
              href={`/list/assignments?classId=${2}`}
            >
              Student&rsquo; Assignments
            </Link>
            <Link
              className="p-3 cursor-pointer rounded-md bg-green-300 text-gray-"
              href={`/list/results?studentId"=${2}`}
            >
              Student&rsquo; Results
            </Link>
          </div>
        </div>
        <Performence />
        <AnnouncementsContainer />
      </div>
    </div>
  );
};

export default SingleStudentPage;
