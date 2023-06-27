// REVIEW: I want to do this a client component, but for some reason when I add
//  'use client' it adds mongoose in the bundle and throws an error.
//  Mongoose should not be a client dependency, it should be a server dependency only

import { authOptions } from "../../utils/auth";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

// const menuItems = [
//     {
//         path: "/tatuadores",
//         // icon: <IoBrowsersOutline size={40} />,
//         title: "Tatuadores",
//         subtitle: "Visualización de datos",
//     },
//     {
//         path: "/tatuajes",
//         // icon: <IoBrowsersOutline size={40} />,
//         title: "Tatuajes",
//         subtitle: "Visualización de datos",
//     },
//     {
//         path: "/blog",
//         // icon: <IoBrowsersOutline size={40} />,
//         title: "Blog",
//         subtitle: "Visualización de datos",
//     },

//     {
//         path: "/profile",
//         title: "Mi perfil",
//         subtitle: "Configura tu perfil",
//     }
//     ,
//     {
//         path: "/works",
//         title: "Mis piezas",
//         subtitle: "Edita tus piezas",
//     }
// ];

async function NavBar({ currentUser }) {
	// Create a navBar component that will be used in the layout.js file
	return (
		// <Container>
		<div className="fixed w-full bg-white z-10 shadow-sm text-black">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu
							currentUser={
								JSON.parse(JSON.stringify(currentUser))
								// currentUser
							}
						/>
					</div>
				</Container>
			</div>
			<Categories />
		</div>
		// </Container>
	);
}

export default NavBar;
