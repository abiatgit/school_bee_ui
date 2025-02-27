import Link from "next/link"

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">  
       <h1 className="text-2xl font-bold">Menu</h1>
    <div className=''><Link href="/">Homepage</Link></div>
    <div className=''><Link href="/student">Student</Link></div>
    <div className=''><Link href="/teacher">Teacher</Link></div>
    <div className=''><Link href="/admin ">Admin</Link></div>
    <div className=''><Link href="/parent ">Parent</Link></div>
    <hr/>

    <hr/>
    <h1 className="text-2xl font-bold">Lists</h1>
    <div className=''><Link href="/list/teachers">TeachersList</Link></div>
    <div className=''><Link href="/list/students">StudentsList</Link></div>
    <div className=''><Link href="/list/parents">ParentsList</Link></div>
    <div className=''><Link href="/list/subjects">SubjectsList</Link></div>
    <div className=''><Link href="/list/classes">ClassesList</Link></div>
    <div className=''><Link href="/list/lessons">LessonsList</Link></div>
    <div className=''><Link href="/list/results">ResultsList</Link></div>
    <div className=''><Link href="/list/exams">ExamsList</Link></div>
    <div className=''><Link href="/list/events">EventsList</Link></div>
    <div className=''><Link href="/list/attendance">AttendanceList</Link></div>
    <div className=''><Link href="/list/announcements">AnnouncementsList</Link></div>
    <hr></hr>
    <h1 className="text-2xl font-bold">Dynamic</h1>
    <div className=''><Link href="/list/teachers/123">Teachers</Link></div>
    <div className=''><Link href="/list/students/123">Students</Link></div>
  
   
</div>
  )
}

export default Homepage
