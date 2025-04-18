"use client";

import { Button } from "@/components/ui/button";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user.publicMetadata.role;

      if (role) {
        router.push(`${role}`);
      } else {
        console.warn("No role found on user metadata.");
        // Optional: handle no role fallback
      }
    }
  }, [isLoaded, isSignedIn, user, router]);
  return (
    <div className="flex  items-center justify-center h-screen ">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-xl font-semibold">Welcome to SchoolBee</h1>
          <Clerk.GlobalError />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label>Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="rounded-md border-gray-300 border-2 h-10 px-2"
            />
            <Clerk.FieldError />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label>Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="rounded-md border-gray-300 border-2 h-10 px-2"
            />
            <Clerk.FieldError />
          </Clerk.Field>

          <SignIn.Action submit>
            <Button asChild>
              <span className="text-white text-sm rounded-md h-10 px-4">
                Sign in
              </span>
            </Button>
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
