import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import FormContainer from "@/components/FormContainer";
import Performence from "@/components/Performence";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage =async ({params:id}:{params:{id:string}}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const teacher=await prisma.teacher.findUnique({
    where:id,
    include:{
    _count:{
      select:{
        subjects:true,
        lessons:true,
        classes:true
      }
    }
    }
  })
  console.log("TEACHER FORM SINGLE PGE",teacher)
 if(!teacher)return "not found"
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* userInfo */}
          <div className="bg-abiSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={
                  teacher.image || "https://media.istockphoto.com/id/1297832726/photo/portrait-of-a-smiling-young-businessman.jpg?s=612x612&w=0&k=20&c=32Qg7TnqfGkrDwTL3q0X0Kx9ab3JDzuqxzp4poH39zc="
                }
                alt="teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              ></Image>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{teacher.name}</h1>
              {role === "admin" && (
                <FormContainer 
                  table="teacher" 
                  type="update" 
                  id={teacher.id} 
                  data={{
                    id: teacher.id,
                    username: teacher.username || "",
                    name: teacher.name || "",
                    surname: teacher.surname || "",
                    email: teacher.email || "",
                    phone: teacher.phone || "",
                    gender: teacher.gender.toLowerCase(),
                    address: teacher.address || "",
                    bloodGroup: teacher.bloodGroup || "",
                    subjects: teacher.subjects?.map(subject => subject.id.toString()) || []
                  }}
                />
              )}
              </div>
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
                  <p>{teacher.bloodGroup}</p>
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
                  <p>{teacher.email}</p>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/phone.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <p>{teacher.phone}</p>
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
              <div>
                <h1 className="text-2xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
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
                <h1 className="text-2xl font-semibold">{teacher?._count?.subjects}</h1>
                <span className="text-sm text-gray-400">Subject</span>
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
                <h1 className="text-2xl font-semibold">{teacher?._count?.lessons}</h1>
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
                <h1 className="text-2xl font-semibold">{teacher?._count?.classes}</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        
        </div>
        {/* bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teeacher&rsquo; Schedule</h1>
          <BigCalenderContainer type="teacherId" id={teacher.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-2xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-500" href={`/list/classes?supervisorId=${"teacher2"}`}>Teeacher&rsquo; Classes</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiYellow text-gray-500" href={`/list/students?teacherId=${"teacher1"}`}>Teeacher&rsquo; Students</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiPurple text-gray-500" href={`/list/lessons?teacherId=${"teacher2"}`}>Teeacher&rsquo; Lessons</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-green-300 text-gray-" href={`/list/exams?teacherId=${"teacher4"}`}>Teeacher&rsquo; Exams</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-"  href={`/list/assignments?teacherId=${"teacher2"}`}>Teeacher&rsquo; Assignments</Link>
          </div>
        </div>
        <Performence />
        <AnnouncementsContainer/>
      </div>
    </div>
  );
};

export default SingleTeacherPage;
