import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "../utils/prismadb";


export async function getSession() {
    return await getServerSession(authOptions) // Auth handles the session for us in both the client and server
}


// using the session object, it gets the current user from the database
export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            }
        });


        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(), // sanitizing the date
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        };
    } catch (error) {
        return null;
    }
}
