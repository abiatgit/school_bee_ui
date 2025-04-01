import { Event } from '@prisma/client';
import React from 'react';
import { getEventsByStartDate }from "@/data/events"

const isValidDate = (d: Date) => {
  return d instanceof Date && !isNaN(d.getTime());
};

const EventList = async ({ dataParam }: { dataParam: string }) => {
  let date = dataParam ? new Date(dataParam) : new Date();
  console.log("DATA PARAM", typeof dataParam, dataParam);
  if (!isValidDate(date)) {
    console.warn('Invalid dateParam:', dataParam);
    date = new Date(); // Fallback to today if the date is invalid
  }
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const data=await getEventsByStartDate(startOfDay,endOfDay)

  return data.map((event: Event) => (
    <div
      className="p-5 rounded-md bg-gray-100 border-2 border-gray-100 border-t-4 odd:border-abiSky even:border-abiPurple"
      key={event.id}
      >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <span className="text-xs text-gray-300">
          {event.startDate.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12:false
          })}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-400">{event.description}</p>
    </div>
  ));
};

export default EventList;
