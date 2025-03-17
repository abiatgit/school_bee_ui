import { auth } from "@clerk/nextjs/server";

export const userRole=async()=>{
  const {sessionClaims}= await auth()
  return (sessionClaims?.metadata as {role?:string})?.role;
}
