import { NextResponse } from "next/server";
import { connect, disconnect } from "../../../../database/db";
import { initialData } from "../../../../database/seedData";
import User from "../../../../models/User";
import Tattoo from "../../../../models/Tattoo";


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
        await connect();

        await User.deleteMany({});
        await Tattoo.deleteMany({});
        // await Product.deleteMany({});
        // await Order.deleteMany({});
        await User.insertMany(initialData.users);

        // find a randome user with role artist 

        const user = await User.findOne({ role: 'artist' });

        const tattoos = initialData.tattoos.map(tattoo => {
            return { ...tattoo, author: user.id }
        })


        await Tattoo.insertMany(tattoos);
        // await Product.insertMany(database.initialData.products);

        await disconnect();

        console.log("Database seeded");

        return NextResponse.json({ count: 101 });

    } catch (error) {

        console.log("Error seeding the database", error);

        return NextResponse.json({ status: 'ERROR' });
    }

}
