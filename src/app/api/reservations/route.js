import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../utils/prismadb";


export async function POST(request) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) { return NextResponse.error() }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    startDate,
                    endDate,
                    totalPrice,
                    userId: currentUser.id
                }
            }
        },
    })


    return NextResponse.json(listingAndReservation)
}
