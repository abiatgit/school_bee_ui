"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export const createSubject = async (state: { success: boolean; error: boolean }, formData: { name: string }) => {
console.log(formData)
  try {
    await prisma.subject.create({
      data: {
        name: formData.name
      },
    }); 
    return { success: true, error: false };
    revalidatePath("/list/subjects");
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (state: { success: boolean; error: boolean }, formData: { name: string ,id:string}) => {
 console.log("update")
    try {
      await prisma.subject.update({
        where:{
          id: formData.id,
        },
        data: {
          name: formData.name
        },
      }); 
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
     