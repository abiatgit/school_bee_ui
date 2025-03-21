import React from 'react'
import EventCalender from './EventCalender'
import EventList from './EventList'
import Image from 'next/image'

interface EventCalenderContainerProps {
  date?: string
}

const EventCalenderContainer =async ({ date }: EventCalenderContainerProps) => {

  return (
    <div className="bg-white rounded-md p-4">
      <EventCalender />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold my-4">Events</h3>
        <Image src="/moreDark.png" alt="arrow-right" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dataParam={date || new Date().toISOString()} />
      </div>
    </div>
  )
}

export default EventCalenderContainer
