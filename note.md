## School Management App
##24-02-2025
 [X] Next app initialize 
 [X] Router initialize 
 [X] Navbar for dashboard page
 [X] admin dashboard page
     - Radial Chart with Re-Charts
     - recharts 
     - react-calendar
 [X] student dashboard page
     - npm i react-big-calendar
     - for localisation installed moment

## Dependencies 
- recharts
- react-calendar
- react-big-calendar
- moment

## 25-02-2025
 [X] student dashboard page
     - react-big-calendar
     - moment
     - customize calendar
[X] teacher dashboard page
[X] parent dashboard page
[X] list teachers page
## Dependencies
- react-big-calendar
- moment

## 26-02-2025
[X] table component
[X] teachers list render
[X] parent list render
[X] student list render
[X] exam list render
[X] event list render
[X] single teacher page
[X] single student page

## 27-02-2025
[X] Delete form
[X] Create form
[X] Update form

## 02-03-2025
[X] Teacher form

## Dependencies
- react-hook-form

## 03-03-2025
[X] Student form
[X] next/dynamic (lazy loading)
## Dependencies
- react-hook-form
- zod
- zod-resolvers

## 04-03-2025
## Backend
- prisma
- npm i prisma
- npm i @prisma/client
- npx prisma init
- define all model
- docker setuo
- prisma migrate dev
- prisma studio
- create seed.ts
- npm install -D typescript ts-node @types/node
- prisma client
- npx prisma migrate reset  
- prisma db seed

## 06-03-2025
[X] Pagination
[X] useRouter

## 07-03-2025
[X] prisma where input
[X] prisma transaction for passing multiple queries
[X] dynamic query for teachers list

## 10/03/2024
[X] Search Teachers list 
      access the value from queryParam - pass that to the teachers page
      show only the teachers include on search text usign SWITCH Statement
[X] Student List
[X] Class List
[X] Parent List
[X] Subject List
[X] Class List

## 11/03/2024
 [X] Prisma nexted query (include ,select,where)
 [X] Exams List 
 [X] Lesson List

## 12/03/2024
 [X] Assignment List
 [X] Announcement List
 [X] Event List
 [X] Result List
 [X] Fetch Data with Query Params on the URL

 ## 13/03/2024
 [X]Using Clerk for user authentication and management 
    Clerk is a comprehensive user authentication and management platform designed for modern 
    web and mobile applications15. It offers a suite of tools and services to simplify the 
    implementation of secure authentication processes.
[X] npm i @clerk/nextjs
[X] Middleware for authentication
[X] set up sign in page
[X] Clerk elements for sign in and sign up (customization)
      npm install @clerk/elements
User Metadata- Public - "role" : "admin"
    https://clerk.com/docs/references/nextjs/read-session-data
    - Then chek the role from current user rediect to the the specific route
    - add parent,teacher,student data  and roles in clerk
[X] createRouteMatcher()  is a Clerk helper function that allows you to protect multiple 
    routes.

## 15/03/2025
[X] access the role from the current user and update the list page

## 16/03/2025
[x] role acces from clerk
     const { sessionClaims } = await auth();
     const role = (sessionClaims?.metadata as { role: string })?.role;

## 20/03/2025
[X] Role based access control (route protection)
[X] Role base data fetching
[X] Role based form access
[X] fetch data for count chart

## 25/03/2025
 [X] fetch data from announcemet 
 [X] fetch data for events
 [X] detch data for subject calander 
 [X] all pages done(Admin,parent,teacher,student)
 [X] Subject form submit (Server aciton)
 [X] Revalidate (once the severaction done/we can revalidate our path to see teh updated data)

 ## 26/03/2025
 [X] const [state, formAction, pending] = useActionState(createUser, initialState)




