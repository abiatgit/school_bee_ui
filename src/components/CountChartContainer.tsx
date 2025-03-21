import React from 'react'
import CountChart from './CountChart'
import Image from 'next/image'
import prisma from '@/lib/prisma'

type GenderCount = {
  gender: 'MALE' | 'FEMALE'
  _count: { _all: number }
}

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ['gender'],
    _count: {
      _all: true
    }
  }) as GenderCount[]

  const boys = data.find(item => item.gender === 'MALE')?._count._all ?? 0
  const girls = data.find(item => item.gender === 'FEMALE')?._count._all ?? 0

  const total = boys + girls
  const boysPercentage = total > 0 ? ((boys / total) * 100).toFixed(1) : '0'
  const girlsPercentage = total > 0 ? ((girls / total) * 100).toFixed(1) : '0'

  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Students</h1>
        <button className="hover:opacity-75 transition-opacity">
          <Image src="/moreDark.png" alt="more options" width={20} height={20} className="w-5 h-5" />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[65%]">
        <CountChart boys={boys} girls={girls} />
      </div>

      {/* Bottom */}
      <div className="flex gap-16 justify-center mt-4">
        <div className="flex flex-col gap-1 items-center">
          <div className="bg-abiSkyLight rounded-full w-5 h-5" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-600">Boys ({boysPercentage}%)</h2>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="bg-abiYellow rounded-full w-5 h-5" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-600">Girls ({girlsPercentage}%)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChartContainer
