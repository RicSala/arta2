import prisma from "../utils/prismadb";


export default async function getListings(searchParams) {

    try {

        const {
            userId,
            roomCount,
            category,
            bathRoomCount,
            guestCount,
            locationValue,
            startDate,
            endDate,

        } = searchParams;

        // we are building the query object for prisma
        let query = {};

        // conditionally add properties to the query object...

        if (userId) {
            query.userId = userId

        }


        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount =
            {
                gte: +roomCount // gte = greater than or equal to & +roomCount converts string to number
            }
        }

        if (bathRoomCount) { // TODO: fix capitalization
            query.bathroomCount = {
                gte: +bathRoomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        // TODO: filter by date range


        // GET ALL LISTINGS using prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            },
        });

        return listings;

    } catch (error) {
        throw new Error(error); // TODO: where does this error go?
    }
}