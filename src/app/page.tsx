import Link from "next/link"

const Homepage = () => {
  return (
    <>  
    <div className=''><Link href="/">Homepage</Link></div>
    <div className=''><Link href="/student">Student</Link></div>
    <div className=''><Link href="/teacher">Teacher</Link></div>
    <div className=''><Link href="/admin ">Admin</Link></div>
    <div className=''><Link href="/parent ">Parent</Link></div>
    <hr/>
    <div className=''><Link href="/list/teachers">TeachersList</Link></div>
    <hr/>
    <div className=''><Link href="/list/students">StudentsList</Link></div>
    </>

  )
}

export default Homepage