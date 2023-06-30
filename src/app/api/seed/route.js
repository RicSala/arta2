import { NextResponse } from "next/server";
import { initialData } from "../../../../database/seedData";
import prisma from "../../../../utils/prismadb";


export async function GET(req) {


    // await handler(req);

    if (req.method !== 'GET') {
        console.log("Error seeding the database");
        return NextResponse.json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    try {
        // await connect();

        prisma.user

        // delete the existing data
        await prisma.user.deleteMany({});
        await prisma.listing.deleteMany({});
        await prisma.reservation.deleteMany({});

        // add the new data
        await prisma.user.createMany({
            data: initialData.users
        })

        await prisma.listing.createMany({
            data: initialData.listings
        })

        await prisma.reservation.createMany({
            data: initialData.reservations
        })


        // // find a randome user with role artist 

        // // const user = await User.findOne({ role: 'artist' });

        // const tattoos = initialData.tattoos.map(tattoo => {
        //     return { ...tattoo, author: user.id }
        // })


        // await Tattoo.insertMany(tattoos);
        // // await Product.insertMany(database.initialData.products);


        console.log("Database seeded");

        return NextResponse.json({ status: 'OK' });

    } catch (error) {

        console.log("Error seeding the database", error);

        return NextResponse.json({ status: 'ERROR' });
    }

}
