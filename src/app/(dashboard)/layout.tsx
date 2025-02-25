import Link from "next/link";
import Image from "next/image";
import { Menu } from "../../components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex ">
      {/* Left */}
      <div className="w-1/6 md:w-1/5 lg:w-1/6 xl:w-1/7 p-4 overflow-scroll">
        <Link
          href={"/"}
          className="flex items-center justify-center  lg:justify-start gap-2"
        >
          <Image src={"/logoipsum-225.svg"} alt="logo" width={32} height={32} />
          <span className="hidden lg:block text-2xl font-bold text-gray-600">schoolBee</span>
        </Link>
        <Menu></Menu>
      </div>
      {/* Right */}
      <div className="w-5/6 md:w-4/5 lg:w-5/6 xl:6/7  bg-[#F7F8FA] overflow-scroll flex flex-col  ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
