import { NextResponse } from "next/server";
import { connect, disconnect } from "../../../../../database/db";
import { isValidEmail } from "../../../../../utils/validations";
import User from "../../../../../models/User";

export async function PUT(req, { params }) {

    // TODO: Not working! How do I get the id from the url in Next13?

    // get the id from the params
    const { id } = params;

    // get the updated user from the body of the request
    const updatedUser = await req.json();

    // connect to the database
    await connect();
    // find the user by id and update it using findOneAndUpdate
    const user = await User.findOneAndUpdate({ _id: id }, updatedUser);

    // disconnect from the database
    await disconnect();

    // return the updated user





    return NextResponse.json({ user: user });

}

