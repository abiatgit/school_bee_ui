import { auth } from "@clerk/nextjs/server";

export async function getRole() {
  const session = await auth();
  return (session?.sessionClaims?.metadata as { role?: string })?.role;
}

export async function isAdmin() {
  const role = await getRole();
  return role === "admin";
}

export async function isTeacher() {
  const role = await getRole();
  return role === "teacher";
}

export async function isStudent() {
  const role = await getRole();
  return role === "student";
}

export async function isParent() {
  const role = await getRole();
  return role === "parent";
} 