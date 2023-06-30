import prisma from "../utils/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        // get the listings that match the ids in the currentUser.favoriteIds array
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds || [],
                },
            },
        });

        const safeFavorites = favorites.map((favorite) => {
            return {
                ...favorite,
                createdAt: favorite.createdAt.toString(), // sanitizing the date
            }
        });

        return safeFavorites;

    } catch (error) {
        throw new Error(error);
    }
}