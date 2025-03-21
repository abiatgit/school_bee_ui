import Image from 'next/image'
import React from 'react'
import CountChart from './CountChart'
import prisma from '@/lib/prisma'

type GenderCount = {
  gender: 'MALE' | 'FEMALE'
  _count: { _all: number }
}

const CountChartContainer = async () => {
   const data = await prisma.student.groupBy({
    by: ["gender"],
    _count: {
      _all: true
    }
   }) as GenderCount[]
 
   const boys = data.find((item) => item.gender === "MALE")?._count._all ?? 0
   const girls = data.find((item) => item.gender === "FEMALE")?._count._all ?? 0


  return (
    <div className="bg-white rounded-lg w-full h-full p-4 ">
    {/* Title */}
    <div className="flex items-center justify-between ">
      <h1 className="text-lg font-semibold">Students</h1>
      <Image src="/moreDark.png" alt="moreData" width={20} height={20} />
    </div>
    {/* Chart */}
    <div className="w-full h-[75%] relative">
            <CountChart boys={boys} girls={girls}/>
        </div>
      {/* Bottom */}
      <div className="flex gap-16  justify-center">
        <div className="flex flex-col gap-1">
          <div className="bg-abiSkyLight rounded-full w-5 h-5" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-600">Boys({((boys/(boys+girls))*100).toFixed(2)}%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="bg-abiYellow rounded-full w-5 h-5" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-600">Girls({((girls/(boys+girls))*100).toFixed(2)}%)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChartContainer
