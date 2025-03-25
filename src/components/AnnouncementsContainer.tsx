import React from 'react'
import Announcements from './Announcements'

const AnnouncementsContainer = () => {
  return (
    <div className="bg-white p-4 rounded-md">
    <div className="flex justify-between ">
      <h1 className="text-2xl font-semibold">Announcements</h1>
      <span className="text-xs text-gray-500">View all</span>
    </div>
    <div className="flex flex-col gap-4 mt-4">
        <Announcements/>

      </div>
    </div>
  )
}

export default AnnouncementsContainer
