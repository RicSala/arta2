import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../actions/getCurrentUser";
import prisma from "../../../../../utils/prismadb";


export async function DELETE(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId")
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id

        }
    })


    return NextResponse.json(listing)
}