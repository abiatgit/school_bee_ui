"use server";
import { Teacherschema } from "./../components/forms/TeacherForm";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Gender } from "@prisma/client";
import { Examschema } from "@/components/forms/ExamForm";
import { ParentFormSchema } from "@/components/forms/ParentForm";

type TeacherFormData = z.infer<typeof Teacherschema>;
type ExamFormData = z.infer<typeof Examschema>;

export const createSubject = async (
  state: { success: boolean; error: boolean },
  formData: { name: string; teachers: string[] }
) => {
  try {
    await prisma.subject.create({
      data: {
        name: formData.name,
        Teachers: {
          connect: formData.teachers.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  state: { success: boolean; error: boolean },
  formData: { name: string; id: string; teachers: string[] }
) => {
  try {
    await prisma.subject.update({
      where: {
        id: parseInt(formData.id),
      },
      data: {
        name: formData.name,
        Teachers: {
          set: formData.teachers.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  console.log(id.id);
  try {
    // First check if subject exists
    const subject = await prisma.subject.delete({
      where: {
        id: parseInt(id.id),
      },
    });
    console.log(subject);
    return { success: true, error: false };
  } catch (err) {
    console.log("Delete error:", err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  state: { success: boolean; error: boolean },
  formData: {
    title: string;
    teachers: string[];
    capacity: number;
    gradeId: string;
  }
) => {
  try {
    const clases = await prisma.class.create({
      data: {
        title: formData.title,
        capacity: formData.capacity,
        gradeId: parseInt(formData.gradeId),
        supervisorId: formData.teachers[0] || null,
      },
    });
    console.log("newClass", clases);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const updateClass = async (
  state: { success: boolean; error: boolean },
  formData: {
    title: string;
    id: string;
    teachers: string[];
    capacity: number;
    gradeId: string;
  }
) => {
  console.log("hello boss");
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

export const deleteClass = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  try {
    // First check if subject exists
    await prisma.class.delete({
      where: {
        id: parseInt(id.id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Delete error:", err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  state: { success: boolean; error: boolean },
  formData: TeacherFormData
) => {
  console.log("creating a teacher ", formData);
  const genderValue = formData.gender.toUpperCase();
  const clerk = await clerkClient();
  try {
    const clerkTeacher = await clerk.users.createUser({
      username: formData.username,
      password: formData.password,
      firstName: formData.name,
      lastName: formData.surname,
      publicMetadata: { role: "teacher" },
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
          connect: formData.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    console.log("newTeacher", teacher);
    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating teacher:", err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  state: { success: boolean; error: boolean },
  formData: TeacherFormData
) => {
  const genderValue = formData.gender.toUpperCase();
  const clerk = await clerkClient();
  try {
    if (!formData.id) {
      return { success: false, error: true };
    }

    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: formData.id },
    });

    if (!existingTeacher) {
      console.log("No teacher found");
      return { success: false, error: true };
    }

    // Try Clerk update, but don't fail if user not found
    try {
      const clerkUser = await clerk.users.getUser(existingTeacher.id);
      await clerk.users.updateUser(clerkUser.id, {
        username: formData.username,
        firstName: formData.name,
        lastName: formData.surname,
      });
    } catch (clerkError) {
      console.warn("Clerk user not found, skipping Clerk update.",clerkError);
    }

    // Always update DB
    await prisma.teacher.update({
      where: { id: formData.id },
      data: {
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: genderValue as keyof typeof Gender,
        bloodGroup: formData.bloodGroup,
        subjects: formData.subjects
          ? {
              set: formData.subjects.map((subjectId) => ({
                id: parseInt(subjectId),
              })),
            }
          : undefined,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  console.log("trying to delete teacher")
  try {
    // First check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: {
        id: id.id,
      },
    });
    console.log("trying to delete teacher",existingTeacher)
    if (!existingTeacher) {
      console.log("No teacher found with ID:", id.id);
      return { success: false, error: true };
    }

    // First delete related records
    try {
         // Delete assignments
         await prisma.assignment.deleteMany({
          where: {
            teacherId: id.id,
          },
        });
      // Delete lessons
      await prisma.lesson.deleteMany({
        where: {
          teacherId: id.id,
        },
      });

      // Delete results
      await prisma.result.deleteMany({
        where: {
          teacherId: id.id,
        },
      });

   

      // Remove teacher from subjects
      await prisma.subject.updateMany({
        where: {
          Teachers: {
            some: {
              id: id.id,
            },
          },
        },
        data: {
          Teachers: {
            disconnect: {
              id: id.id,
            },
          },
        },
      });
    } catch (error) {
      console.log("Error deleting related records:", error);
      // Continue with deletion even if related records fail
    }

    // Delete from database
    await prisma.teacher.delete({
      where: {
        id: id.id,
      },
    });

    try {
      // Try to delete from Clerk
      const clerk = await clerkClient();
      await clerk.users.deleteUser(existingTeacher.id);
    } catch (error) {
      console.log(
        "Clerk deletion failed, but teacher was deleted from database",error
      );
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  state: { success: boolean; error: boolean },
  formData: TeacherFormData
) => {
  const genderValue = formData.gender.toUpperCase();
  const clerk = await clerkClient();
  try {
    const clerkStudent = await clerk.users.createUser({
      username: formData.username,
      password: formData.password,
      firstName: formData.name,
      lastName: formData.surname,
      publicMetadata: { role: "student" },
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
          connect: formData.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
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

export const updateStudent = async (
  state: { success: boolean; error: boolean },
  formData: StudentFormData
) => {
  console.log("student ID", formData.id);
  const genderValue = formData.gender.toUpperCase();
  try {
    if (!formData.id) {
      return { success: false, error: true };
    }

    // First check if student exists in database
    const existingStudent = await prisma.student.findUnique({
      where: {
        id: formData.id,
      },
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
      console.log("Clerk update failed, continuing with database update",clerkError);
    }

    // Update Prisma student
    await prisma.student.update({
      where: {
        id: formData.id,
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
        image: formData.image,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  try {
    const existingStudent = await prisma.student.findUnique({
      where: {
        id: id.id,
      },
    });

    if (!existingStudent) {
      return { success: false, error: true };
    }
    try {
      await prisma.result.deleteMany({
        where: {
          studentId: id.id,
        },
      });

      // Delete attendance records
      await prisma.attendance.deleteMany({
        where: {
          studentId: id.id,
        },
      });

      // Delete assignments
      await prisma.assignment.deleteMany({
        where: {
          studentId: id.id,
        },
      });
    } catch (error) {
      console.log("Error deleting related records:", error);
    }

    try {
      // Try to delete from Clerk first
      const clerk = await clerkClient();
      await clerk.users.deleteUser(existingStudent.id);
    } catch (clerkError) {
      console.log(
        "Failed to delete student from Clerk, continuing with database deletion",
        clerkError
      );
    }

    // Finally delete the student
    await prisma.student.delete({
      where: {
        id: id.id,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, error: true };
  }
};

export const createParent = async (
  state: { success: boolean; error: boolean },
  formData: ParentFormSchema
) => {
  console.log(formData);
  return { success: true, error: false };
};

export const updateParent = async (
  state: { success: boolean; error: boolean },
  formData: ParentFormSchema
) => {
  console.log(formData);
  return { success: true, error: false };
  // try {
  //   const { email, password, ...parentData } = data;

  //   // Update parent in database
  //   const parent = await prisma.parent.update({
  //     where: { id },
  //     data: parentData,
  //   });

  //   // If email is being updated, update it in Clerk too
  //   if (email) {
  //     const clerk = await clerkClient();
  //     await clerk.users.updateUser(parent.clerkId, {
  //       primaryEmailAddressID: email,
  //     });
  //   }

  //   return { success: true, data: parent };
  // } catch (error: any) {
  //   console.error("Error updating parent:", error);
  //   return { success: false, error: error.message };
  // }
};

export const deleteParent = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { id: id.id },
    });

    if (!parent) {
      console.log("No parent found with ID:", id);
      return { success: false, error: "No parent found with this ID" };
    }

    // Delete related records first
    const updateStudetTable = await prisma.student.updateMany({
      where: { parentId: id.id },
      data: { parentId: null },
    });
    console.log("updata studet table", updateStudetTable);
    // Delete parent from database
    await prisma.parent.delete({
      where: { id: id.id },
    });

    // // Try to delete from Clerk, but don't fail if it doesn't work
    // try {
    //   const clerk = await clerkClient();
    //   await clerk.users.deleteUser(parent.clerkId);
    // } catch (clerkError) {
    //   console.log("Failed to delete parent from Clerk:", clerkError);
    // }
    // revalidatePath("/list/parents");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting parent:", error);
    return { success: false, error: error.message };
  }
};

export const createExam = async (
  state: { success: boolean; error: boolean },
  formData: ExamFormData,

) => {
  try {
    await prisma.exam.create({
      data: {
        title: formData.title,
        startTime: formData.startTime,
        endTime: formData.endTime,
        lessonId: formData.id,
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

export const updateExam = async (
  state: { success: boolean; error: boolean },
  formData: ExamFormData
) => {
  console.log("updateExam", formData);
  try {
    await prisma.exam.update({
      where: {
        id: formData.id,
      },
      data: {
        title: formData.title,
        startTime: formData.startTime,
        endTime: formData.endTime,
        lessonId: formData.id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  state: { success: boolean; error: boolean },
  id: { id: string }
) => {
  try {
    // Delete exam
    await prisma.exam.delete({
      where: {
        id: parseInt(id.id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting exam:", err);
    return { success: false, error: true };
  }
};
