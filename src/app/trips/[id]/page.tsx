import { TripHeader } from '@/components/TripHeader'
import { TripReservation } from '@/components/TripReservation'
import { TripLocation } from '@/components/TripLocation'
import { TripDescription } from '@/components/TripDescription'
import { prisma } from '@/lib/prisma'
import { TripHighlights } from '@/components/TripHighlights'

interface TripDetailsProps {
  params: {
    id: string
  }
}

async function getTripDetails(tripId: string) {
  const trip = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  })

  return trip
}

export default async function TripDetails({ params }: TripDetailsProps) {
  const trip = await getTripDetails(params.id)

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />

      <div className="mt-5 px-5 flex flex-col gap-10">
        <TripReservation
          startDate={trip.startDate}
          endDate={trip.endDate}
          maxGuests={trip.maxGuests}
          pricePerDay={Number(trip.pricePerDay)}
        />

        <div className="space-y-10">
          <TripDescription description={trip.description} />

          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>

      <TripLocation
        location={trip.location}
        description={trip.locationDescription}
      />
    </div>
  )
}
