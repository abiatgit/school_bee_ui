
"use server";
import { Teacherschema } from './../components/forms/TeacherForm';
import {  z } from 'zod';
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { clerkClient } from '@clerk/nextjs/server';
import { Gender } from '@prisma/client';
import ParentForm from '@/components/forms/ParentForm';
import { Examschema } from '@/components/forms/ExamForm';

type TeacherFormData = z.infer<typeof Teacherschema>;
type ExamFormData=z.infer<typeof Examschema>

export const createSubject = async (state: { success: boolean; error: boolean }, formData: { name: string; teachers: string[] }) => {
  try {
    await prisma.subject.create({
      data: {
        name: formData.name,
        Teachers: {
          connect: formData.teachers.map(id => ({ id }))
        }
      },
    }); 
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (state: { success: boolean; error: boolean }, formData: { name: string; id: string; teachers: string[] }) => {
  try {
    await prisma.subject.update({
      where: {
        id: parseInt(formData.id),
      },
      data: {
        name: formData.name,
        Teachers: {
          set: formData.teachers.map(id => ({ id }))
        }
      },
    }); 
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
  
export const deleteSubject = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
console.log(formData.id)
  try {
    // First check if subject exists
    const subject = await prisma.subject.delete({
      where: {
        id: parseInt(formData.id)
      }
    });
    console.log(subject)
    return { success: true, error: false };

  } catch (err) {
    console.log("Delete error:", err);
    return { success: false, error: true };
  }
};
     
export const createClass = async (state: { success: boolean; error: boolean },formData: {  title: string; teachers: string[] ,capacity:number,gradeId:string}) => {

  try {
   const clases= await prisma.class.create({
      
        data: {
          title: formData. title,
          capacity: formData.capacity,
          gradeId: parseInt(formData.gradeId),
          supervisorId: formData.teachers[0] || null,
        
      },
    });
    console.log("newClass",clases)
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const updateClass= async (state: { success: boolean; error: boolean }, formData: { title: string; id: string; teachers: string[]; capacity: number; gradeId: string }) => {
  console.log("hello boss")
  try {
    await prisma.Class.update({
      where: {
        id: parseInt(formData.id),
      },
      data: {
        title: formData.title,
        capacity: formData.capacity,
        gradeId: parseInt(formData.gradeId),
        supervisorId: formData.teachers[0] || null,
      },
    }); 
  
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
    try {
      // First check if subject exists
      const subject = await prisma.class.delete({
        where: {
          id: parseInt(formData.id)
        }
      });
  
      return { success: true, error: false };
  
    } catch (err) {
      console.log("Delete error:", err);
      return { success: false, error: true };
    }
  };

  export const createTeacher = async (state: { success: boolean; error: boolean }, formData: TeacherFormData) => {
    const genderValue = formData.gender.toUpperCase();
          const clerk= await clerkClient()
    try {
      const clerkTeacher = await clerk.users.createUser({
        username: formData.username,
        password: formData.password,
        firstName:formData.name,
        lastName:formData.surname,
        publicMetadata: { role: "teacher" }
      });

      const teacher = await prisma.teacher.create({
        
        data: {
          id: clerkTeacher.id,
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          image: formData.image ?? null,
          bloodGroup: formData.bloodGroup,
          address: formData.address,
          gender: genderValue as keyof typeof Gender,
          subjects: {
            connect: formData.subjects?.map((subjectId:string)=>({
              id:parseInt(subjectId)
            }))
          }
        
        },
      }); 
      console.log("newTeacher", teacher);
      return { success: true, error: false };
    } catch (err) {
      console.log("Error creating teacher:", err);
      return { success: false, error: true };
    }
  };
  export const updateTeacher = async (state: { success: boolean; error: boolean }, formData: TeacherFormData) => {
    console.log("TEACHER ID", formData.id);
    const genderValue = formData.gender.toUpperCase();
    try {
      if (!formData.id) {
        return { success: false, error: true };
      }

      const existingTeacher = await prisma.teacher.findUnique({
        where: {
          id: formData.id
        }
      });

      if (!existingTeacher) {
        console.log("no teacher");
        return { success: false, error: true };
      }

      // Update Clerk user
      const clerk = await clerkClient();
      await clerk.users.updateUser(existingTeacher.id, {
        username: formData.username,
        firstName: formData.name,
        lastName: formData.surname,
      });

      // Update Prisma teacher
      await prisma.teacher.update({
        where: {
          id: formData.id
        },
        data: {
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          gender: genderValue as keyof typeof Gender,
          bloodGroup: formData.bloodGroup,
          subjects: formData.subjects ? {
            set: formData.subjects.map(subjectId => ({ id: parseInt(subjectId) }))
          } : undefined
        },
      }); 
  
      return { success: true, error: false };
    } catch (error) {
      console.error("Error updating teacher:", error);
      return { success: false, error: true };
    }
  };
  export const deleteTeacher = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
    try {
      // First check if teacher exists
      const existingTeacher = await prisma.teacher.findUnique({
        where: {
          id: formData.id
        }
      });

      if (!existingTeacher) {
        console.log("No teacher found with ID:", formData.id);
        return { success: false, error: true };
      }

      // First delete related records
      try {
        // Delete lessons
        await prisma.lesson.deleteMany({
          where: {
            teacherId: formData.id
          }
        });

        // Delete results
        await prisma.result.deleteMany({
          where: {
            teacherId: formData.id
          }
        });

        // Delete assignments
        await prisma.assignment.deleteMany({
          where: {
            teacherId: formData.id
          }
        });

        // Remove teacher from subjects
        await prisma.subject.updateMany({
          where: {
            Teachers: {
              some: {
                id: formData.id
              }
            }
          },
          data: {
            Teachers: {
              disconnect: {
                id: formData.id
              }
            }
          }
        });
      } catch (error) {
        console.log("Error deleting related records:", error);
        // Continue with deletion even if related records fail
      }

      // Delete from database
      await prisma.teacher.delete({
        where: {
          id: formData.id
        }
      });

      try {
        // Try to delete from Clerk
        const clerk = await clerkClient();
        await clerk.users.deleteUser(existingTeacher.id);
      } catch (error) {
        console.log("Clerk deletion failed, but teacher was deleted from database");
      }

    ParentForm
      return { success: true, error: false };
    } catch (error) {
      console.error("Error deleting teacher:", error);
      return { success: false, error: true };
    }
  };

// STUDNET DATA MANIPULATION
export const createStudent = async (state: { success: boolean; error: boolean }, formData: TeacherFormData) => {
  const genderValue = formData.gender.toUpperCase();
        const clerk= await clerkClient()
  try {
    const clerkStudent = await clerk.users.createUser({
      username: formData.username,
      password: formData.password,
      firstName:formData.name,
      lastName:formData.surname,
      publicMetadata: { role: "student" }
    });

    const teacher = await prisma.teacher.create({
      
      
      data: {
        id: clerkStudent.id,
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        image: formData.image ?? null,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        gender: genderValue as keyof typeof Gender,
        subjects: {
          connect: formData.subjects?.map((subjectId:string)=>({
            id:parseInt(subjectId)
          }))
        }
      
      },
    }); 
    console.log("newTeacher", teacher);
    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating teacher:", err);
    return { success: false, error: true };
  }
};

type StudentFormData = {
  id?: string;
  username: string;
  name: string;
  surname: string;
  email?: string | null;
  password?: string;
  phone?: string | null;
  address: string;
  gender: "male" | "female" | "other";
  birthDate?: string;
  bloodGroup: string;
  image?: string;
  gradeId: number;
  classId: number;
  parentId: string;
};

export const updateStudent = async (state: { success: boolean; error: boolean }, formData: StudentFormData) => {
  console.log("student ID", formData.id);
  const genderValue = formData.gender.toUpperCase();
  try {
    if (!formData.id) {
      return { success: false, error: true };
    }

    // First check if student exists in database
    const existingStudent = await prisma.student.findUnique({
      where: {
        id: formData.id
      }
    });

    if (!existingStudent) {
      console.log("no student found in database");
      return { success: false, error: true };
    }

    try {
      // Try to update Clerk user
      const clerk = await clerkClient();
      await clerk.users.updateUser(existingStudent.id, {
        username: formData.username,
        firstName: formData.name,
        lastName: formData.surname,
      });
    } catch (clerkError) {
      console.log("Clerk update failed, continuing with database update");
    }

    // Update Prisma student
    await prisma.student.update({
      where: {
        id: formData.id
      },
      data: {
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: genderValue as keyof typeof Gender,
        bloodGroup: formData.bloodGroup,
        image: formData.image
      },
    }); 

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: true };
  }
};
export const deleteStudent = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
  try {
    console.log("Attempting to delete student with ID:", formData.id);
    
    // First check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        id: formData.id
      }
    });

    if (!existingStudent) {
      console.log("No student found with ID:", formData.id);
      return { success: false, error: true };
    }

    // First delete related records
    try {
      // Delete results
      await prisma.result.deleteMany({
        where: {
          studentId: formData.id
        }
      });

      // Delete attendance records
      await prisma.attendance.deleteMany({
        where: {
          studentId: formData.id
        }
      });

      // Delete assignments
      await prisma.assignment.deleteMany({
        where: {
          studentId: formData.id
        }
      });

    } catch (error) {
      console.log("Error deleting related records:", error);
      // Continue with deletion even if related records fail
    }

    try {
      // Try to delete from Clerk first
      const clerk = await clerkClient();
      await clerk.users.deleteUser(existingStudent.id);
    } catch (clerkError) {
      console.log("Failed to delete student from Clerk, continuing with database deletion");
    }

    // Finally delete the student
    await prisma.student.delete({
      where: {
        id: formData.id
      }
    });

    console.log("Successfully deleted student with ID:", formData.id);
   
    return { success: true, error: false };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, error: true };
  }
};

export const createParent = async (data: any) => {
  try {
    const { email, password, ...parentData } = data;
    
    // Create user in Clerk
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      publicMetadata: {
        role: "parent",
      },
    });

    // Create parent in database
    const parent = await prisma.parent.create({
      data: {
        ...parentData,
        clerkId: clerkUser.id,
      },
    });

    return { success: true, data: parent };
  } catch (error: any) {
    console.error("Error creating parent:", error);
    return { success: false, error: error.message };
  }
};

export const updateParent = async (id: string, data: any) => {
  try {
    const { email, password, ...parentData } = data;
    
    // Update parent in database
    const parent = await prisma.parent.update({
      where: { id },
      data: parentData,
    });

    // If email is being updated, update it in Clerk too
    if (email) {
      const clerk = await clerkClient();
      await clerk.users.updateUser(parent.clerkId, {
        primaryEmailAddressID: email,
      });
    }

    return { success: true, data: parent };
  } catch (error: any) {
    console.error("Error updating parent:", error);
    return { success: false, error: error.message };
  }
};

export const deleteParent = async (id: string) => {

  try {
    // Check if parent exists
    const parent = await prisma.parent.findUnique({
      where: { id },
    });

    if (!parent) {
      console.log("No parent found with ID:", id);
      return { success: false, error: "No parent found with this ID" };
    }

    // Delete related records first
    await prisma.student.updateMany({
      where: { parentId: id },
      data: { parentId: null },
    });

    // Delete parent from database
    await prisma.parent.delete({
      where: { id },
    });

    // Try to delete from Clerk, but don't fail if it doesn't work
    try {
      const clerk = await clerkClient();
      await clerk.users.deleteUser(parent.clerkId);
    } catch (clerkError) {
      console.log("Failed to delete parent from Clerk:", clerkError);
    }

    revalidatePath("/list/parents");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting parent:", error);
    return { success: false, error: error.message };
  }
};

export const createExam = async (state: { success: boolean; error: boolean },formData:ExamFormData,data:ExamFormData) => {
  try {
    await prisma.exam.create({
      data: {
        title: formData.title,
        startTime: formData.startTime,
        endTime:formData.endTime,
        lessonId: formData.id
      },
      // teachers:{
      //   set:formData.
      // }
    }); 
    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (state: { success: boolean; error: boolean }, formData:ExamFormData) => {
  console.log("updateExam",formData)
  try {
    await prisma.exam.update({
      where: {
        id:formData.id
      },
      data: {
        title: formData.title,
        startTime: formData.startTime,
        endTime:formData.endTime,
        lessonId: formData.id
      },
    }); 

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
  
export const deleteExam = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
  try {
    // Delete exam
    await prisma.exam.delete({
      where: {
        id: parseInt(formData.id)
      }
    });
  
    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting exam:", err);
    return { success: false, error: true };
  }
};
