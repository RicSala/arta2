import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function POST(request) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;


    // const listing = await Listing.create({
    //     title,
    //     description,
    //     imageSrc,
    //     category,
    //     roomCount,
    //     bathroomCount,
    //     guestCount,
    //     locationValue: location.value,
    //     price: parseInt(price),
    //     userId: currentUser._id
    // });

    // create the listing with prisma instead of mongoose
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price),
            userId: currentUser.id
        }
    })


    return NextResponse.json(listing)

}
