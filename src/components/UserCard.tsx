import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/prisma'

type ModelDelegate = {
  count: (args?: object) => Promise<number>
}

const UserCard = async ({type}:{type:"admin"|"student"|"teacher"|"parent"}) => {
  const modelMap: Record<string, ModelDelegate> = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
    parent: prisma.parent
  }

  const data= await modelMap[type].count({})
  console.log(data)

  return (
    <div className='rounded-2xl odd:bg-abiPurple even:bg-abiYellow p-4  flex-1 min-w-[130px]'>
    <div className='flex justify-between items-center'>
        <span className='text-[10-px] bg-white px-2 py-1 rounded-full text-green-600'>2024/25</span>
        <Image src="/more.png" alt="" width={20} height={20}></Image>
    </div>
    <h1 className='text-2xl font-semibold my-4'>{data}</h1>
    <h2 className='capitalize text-sm font-medium text-gray-500'>{type}s</h2>
    </div>
  )
}

export default UserCard
