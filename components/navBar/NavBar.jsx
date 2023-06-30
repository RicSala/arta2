

// REVIEW: I want to do this a client component, but for some reason when I add
//  'use client' it adds mongoose in the bundle and throws an error.
//  Mongoose should not be a client dependency, it should be a server dependency only

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";


async function NavBar({
    currentUser,
}) {


    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div className="fixed w-full bg-white z-10 shadow-sm text-black">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

                        <Logo />
                        <Search />
                        <UserMenu currentUser={
                            JSON.parse(JSON.stringify(currentUser))
                            // currentUser
                        } />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
        // </Container>
    )


}

export default NavBar;