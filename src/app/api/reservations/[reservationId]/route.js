import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../actions/getCurrentUser";
import prisma from "../../../../../utils/prismadb";

export async function DELETE(request, { params }) {

    const currentUser = await getCurrentUser(request)

    if (!currentUser) { return NextResponse.error() }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid reservationId')
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId, // the only people able to delete the reservation are the user who made the reservation...
            OR: [ // ...or the user who owns the listing
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]

        }
    })

    return NextResponse.json(reservation)

}



