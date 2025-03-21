import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import Performence from "@/components/Performence";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
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
                 "https://imgs.search.brave.com/X5CsFSE3VbCLKEElurN6jMVNEX1Iv1S_46KXHEVy-FU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjA4/MDAyNzgwL3Bob3Rv/L2hhcHB5LXN0dWRl/bnQtYXQtdGhlLXNj/aG9vbC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9QUd0NjNL/TldHMnI4SlZ5MVda/NEMydmNYME45LURQ/ajZDNmJ4aFlNR3o0/OD0"
                }
                alt="teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover border-2 border-white shadow-lg "
              ></Image>
            </div>
            <div className="w-2/3 ms-4 flex flex-col justify-between gap-4">
              <h2 className="text-2xl font-semibold">Karen</h2>
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
                  <p>A+</p>
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
                  <p>user@gmail.com</p>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src={"/phone.png"}
                    alt="location"
                    width={16}
                    height={16}
                  ></Image>
                  <p> 9876543210</p>
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
                <h1 className="text-2xl font-semibold">9th</h1>
                <span className="text-sm text-gray-400">Grade</span>
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
                <h1 className="text-2xl font-semibold">9A</h1>
                <span className="text-sm text-gray-400">Class</span>
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
          <h1>Teeacher&rsquo; Schedule</h1>
          <BigCalender />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-2xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-500" href={`/list/teachers?classId=${1}`}>Student&rsquo; Teachers</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiYellow text-gray-500" href={`/list/exams?classId=${1}`}>Student&rsquo; Exams</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiPurple text-gray-500" href={`/list/lessons?classId=${2}`}>Student&rsquo; Lessons</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-abiSky text-gray-" href={`/list/assignments?classId=${2}` }>Student&rsquo; Assignments</Link>
            <Link className="p-3 cursor-pointer rounded-md bg-green-300 text-gray-"   href={`/list/results?studentId"=${2}`}>Student&rsquo; Results</Link>
          </div>
        </div>
        <Performence />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
