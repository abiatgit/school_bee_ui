import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/prisma'

type ModelDelegate = {
  count: (args?: object) => Promise<number>
}

type UserType = "admin" | "student" | "teacher" | "parent"

const UserCard = async ({ type }: { type: UserType }) => {
  const modelMap: Record<UserType, ModelDelegate> = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
    parent: prisma.parent
  }

  const data = await modelMap[type].count({})

  const getCardColor = () => {
    switch(type) {
      case 'admin': return 'bg-abiPurple hover:bg-abiPurpleLight';
      case 'student': return 'bg-abiYellow hover:bg-abiYellowLight';
      case 'teacher': return 'bg-abiSky hover:bg-abiSkyLight';
      case 'parent': return 'bg-abiPurple hover:bg-abiPurpleLight';
      default: return 'bg-gray-100 hover:bg-gray-200';
    }
  }

  return (
    <div className={`rounded-2xl ${getCardColor()} p-4 flex-1 min-w-[130px] transition-colors duration-200 shadow-sm hover:shadow-md`}>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600 font-medium'>2024/25</span>
        <button className='hover:opacity-75 transition-opacity'>
          <Image src="/more.png" alt="more options" width={20} height={20} className='w-5 h-5' />
        </button>
      </div>
      <h1 className='text-2xl font-semibold my-4'>{data}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-600'>{type}s</h2>
    </div>
  )
}

export default UserCard
