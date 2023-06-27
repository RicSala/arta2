import prisma from "../utils/prismadb";


export default async function getListings(params

) {

    try {

        const { userId } = params;

        let query = {};

        if (userId) {
            query.userId = userId

        }

        // GET ALL LISTINGS using prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            },


        });


        return listings;
    } catch (error) {
        throw new Error(error);
    }
}