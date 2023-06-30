import { NextResponse } from "next/server";
import prisma from "../../../../../utils/prismadb";

export async function PUT(req, { params }) {

    // get the id from the params
    const { id } = params;

    // get the updated user from the body of the request
    const updatedUser = await req.json();

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: updatedUser
    })
    return NextResponse.json({ user: user });
}

