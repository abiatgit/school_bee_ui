"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export const createSubject = async (formData: FormData) => {
  try {
    const subjectName = formData.get("subject");
   
    if (typeof subjectName !== "string" || !subjectName.trim()) {
      throw new Error("Subject name is required and must be a string");
    }

    await prisma.subject.create({
      data: {
        name: subjectName,
      },
    }); // Extr
    revalidatePath("/list/subjects")
  } catch (err) {
    console.log(err);
  }
};
