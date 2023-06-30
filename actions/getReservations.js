import prisma from "../utils/prismadb"


export async function getReservations(params) {

    try {

        const {
            listingId,
            userId,
            authorId, } = params

        const query = {}

        if (listingId) {
            query.listingId = listingId
        }

        if (userId) {
            query.userId = userId
        }

        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true // This is adding it to the response
            },
            orderBy: {
                createdAt: "desc"
            }
        })


        const safeReservations = reservations.map(reservation => {
            return {
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                }
            }
        })

        return safeReservations

    } catch (error) {
        throw new Error(error)
    }
}
