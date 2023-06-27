"use client";

import Link from "next/link";
import SignoutButton from "../SignoutButton";
import Avatar from "../Avatar";
import { authOptions } from "../../utils/auth";
import { getServerSession } from "next-auth";
import Container from "../Container";

const menuItems = [
	{
		path: "/tatuadores",
		// icon: <IoBrowsersOutline size={40} />,
		title: "Tatuadores",
		subtitle: "Visualización de datos",
	},
	{
		path: "/tatuajes",
		// icon: <IoBrowsersOutline size={40} />,
		title: "Tatuajes",
		subtitle: "Visualización de datos",
	},
	{
		path: "/blog",
		// icon: <IoBrowsersOutline size={40} />,
		title: "Blog",
		subtitle: "Visualización de datos",
	},

	{
		path: "/profile",
		title: "Mi perfil",
		subtitle: "Configura tu perfil",
	},
	{
		path: "/works",
		title: "Mis piezas",
		subtitle: "Edita tus piezas",
	},
];

async function NavBar() {
	const session = await getServerSession(authOptions);

	// Create a navBar component that will be used in the layout.js file
	return (
		<Container>
			<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<span className="font-semibold text-xl tracking-tight">Next.js</span>
				</div>
				<div className="block lg:hidden">
					<button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
						<svg
							className="fill-current h-3 w-3"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* <title>Menu</title> */}
							<path fillRule="evenodd" d="M2 5h16v2H2V5zm0 6h16v2H2v-2zm0 6h16v2H2v-2z" />
						</svg>
					</button>
				</div>
				<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
					<div className="text-sm lg:flex-grow">
						{menuItems.map((item) => (
							<Link
								href={item.path}
								key={item.path}
								className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
							>
								{item.title}
							</Link>
						))}
					</div>
					<div className="flex flex-row gap-2">
						{/* Create a circle avatar */}
						{session ? (
							<>
								<Avatar />
							</>
						) : (
							<Link
								href="/auth/login"
								className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
							>
								Signin
							</Link>
						)}
					</div>
				</div>
			</nav>
		</Container>
	);
}

export default NavBar;
