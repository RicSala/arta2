import { getCurrentUser } from "../../../../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import { connect, disconnect } from "../../../../../database/db";


export async function POST(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }


    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(listingId)




    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })


    return NextResponse.json(user)
}

export async function DELETE(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter(id => id !== listingId)

    // save the user with the new favoriteIds
    // const user = await User.findByIdAndUpdate(currentUser._id, { favoriteIds })

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}