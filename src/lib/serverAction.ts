import { Teacherschema } from './../components/forms/TeacherForm';
import { z } from 'zod';
"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

type TeacherFormData = z.infer<typeof Teacherschema>;

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
  console.log("hello i cam e",formData)
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
    console.log("hello i cam e",formData)
    try {
     const teacher = await prisma.teacher.create({
        data: {
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
          gender: formData.gender,
          birthDate: formData.birthDate,
          bloodGroup: formData.bloodGroup,
        },
      }); 
      console.log("newTeacher", teacher)
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  export const updateTeacher= async (state: { success: boolean; error: boolean }, formData: { title: string; id: string; teachers: string[]; capacity: number; gradeId: string }) => {
    console.log("hello boss")
    try {
      await prisma.teacher.update({
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
  
  export const deleteTeacher = async (state: { success: boolean; error: boolean }, formData: { id: string }) => {
  
      try {
       await prisma.teacher.delete({
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