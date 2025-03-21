import prisma from "@/lib/prisma"

export async function getEventsByStartDate ( startOfDay:Date, endOfDay:Date){
    const data = await prisma.event.findMany({
          where: {
            startDate: {
              gte: startOfDay,
              lte: endOfDay
            }
          }
        })

          return data

}