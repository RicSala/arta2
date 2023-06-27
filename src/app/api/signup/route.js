import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { isValidEmail } from '../../../../utils/validations';
import { connect, disconnect } from '../../../../database/db';
import prisma from '../../../../utils/prismadb';


export async function GET(req) {


    return NextResponse.json({ count: 100 });

}

export async function POST(req) {

    console.log("req llega")

    const { name, email, city, password, confirmPassword } = await req.json()
    console.log("req llega")

    // VALIDATIONS ##############################
    if (password.length < 8) {
        console.log("password.length < 8")
        return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: '400', })
    }

    if (name.length < 3) {
        console.log("name.length < 3")
        return NextResponse.json({ error: 'El nombre debe tener al menos 3 caracteres' }, { status: '400', })
    }

    if (!isValidEmail(email)) {
        console.log("!isValidEmail(email)")
        return NextResponse.json({ error: 'Por favor, introduce un email válido' }, { status: '400', })
    }

    // if (city.length < 3) {
    //     await disconnect();
    //     return NextResponse.json({ status: 'ERROR', error: 'La ciudad debe tener al menos 3 caracteres' });
    // }

    // if (password !== confirmPassword) {
    //     await disconnect();
    //     return NextResponse.json({ status: 'ERROR', error: 'Las contraseñas no coinciden' });
    // }


    // check if user exists using prisma
    const userExists = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase(),
        }
    });

    if (userExists) {
        return NextResponse.json({ error: 'No ha sido posible realizar el registro - USUARIO' }, { status: '500', })
    }

    // if it doesn't exist, create it
    // const newUser = new User({
    //     name,
    //     email: email.toLowerCase(),
    //     city: 'Pending',
    //     role: 'user',
    //     password,
    //     confirmPassword
    //     // password: bcrypt.hashSync(password) // TODO: For now we are not going to encrypt the password
    // });

    try {
        // const registeredUser = await newUser.save();
        console.log("CREATING NEW USER");
        const newUser = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                // city: 'Pending',
                // role: 'user',
                hashedPassword: password,
                // confirmPassword
            }
        })

        console.log("NEW USER CREATED", newUser);

        // save the user in the db

        return NextResponse.json({
            user: newUser
        })


    } catch (error) {
        console.log("Error while saving new user", error);
        return NextResponse.json({ error: 'No ha sido posible realizar el registro - ERROR ON SAVE' }, { status: '500', });
    }


}