import prisma from "../utils/prismadb";

export const checkUserEmailPassword = async (email, password) => {

    if (!email || !password) {
        throw new Error("Email y contraseña requeridos");
    }

    // get the user using prisma client
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })


    if (!user) {
        console.log("USUARIO NO ENCONTRADO")
        throw new Error("Credenciales no válidas");
    }

    // check if the password passed in matches the password in the db
    // const match = await bcrypt.compare(password, user.password) // TODO: as we are not hashing the password, we don't need to compare it with bcrypt. Change in the future

    console.log("user", user)

    const isCorrectPassword = password === user.hashedPassword;

    if (!isCorrectPassword) {
        console.log("CONTRASEÑA INCORRECTA")
        throw new Error("Credenciales no válidas");
    }

    // return the user if the password matches
    const { role, name, _id, profilePic, city } = user;

    // TODO: Do "return user" instead
    return { role, name, _id, profilePic, city, email };

}


export const checkOauthUser = async (oAuthemail, oAuthname, oAuthimage) => {


    const user = await prisma.user.findUnique({
        where: {
            email: oAuthemail
        }
    })


    if (user) {
        const { role, name, email, _id, profilePic } = user;
        return { role, name, email, _id, profilePic };
    }

    // if the user does not exist, we create it



    // const newUser = await User.create({
    //     name: oAuthname,
    //     email: oAuthemail,
    //     profilePic: oAuthimage || undefined,
    //     password: "@@@@@@", // TODO: Isn't this a security issue? Shouldn't we generate a random password?
    //     role: "user"
    // })

    // create user with prismadb

    try {


        const newUser = await prisma.user.create({
            data: {
                name: oAuthname,
                email: oAuthemail,
                image: oAuthimage || undefined,
                hashedPassword: "@@@@@@", // TODO: Isn't this a security issue? Shouldn't we generate a random password?
                // role: "user"
            }
        })
        const { role, name, email, _id } = newUser;
        return { role, name, email, _id, profilePic: oAuthimage }; // why not return newUser? because we don't want to return the some fields like password
    } catch (error) {
        console.log("ERROR AL GUARDAR USUARIO EN DB", error)
    }


}

