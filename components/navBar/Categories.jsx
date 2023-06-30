'use client'

import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";


export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "Esta propiedad está cerca de la playa",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Esta propiedad está cerca de los molinos de viento",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Esta propiedad es moderna",
    },

    {
        label: "Countryside",
        icon: TbMountain,
        description: "Esta propiedad está en el campo",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "Esta propiedad tiene piscina",
    },
    {
        label: "islands",
        icon: GiIsland,
        description: "Esta propiedad está en una isla",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "Esta propiedad está cerca de un lago",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "Esta propiedad está cerca de una estación de esquí",
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "Esta propiedad está cerca de un castillo",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Esta propiedad está cerca de un camping",
    },
    {
        label: "Artic",
        icon: BsSnow,
        description: "Esta propiedad está en el ártico",
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Esta propiedad está cerca de una cueva",
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "Esta propiedad está en el desierto",
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "Esta propiedad está cerca de un granero",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "Esta propiedad es de lujo",
    },
]

const Categories = ({ }) => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainPage = pathName === '/';

    if (!isMainPage) { // if we are not in the main page, we don't render the categories
        return null;
    }



    return (
        <Container>
            <div className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        ">
                {
                    categories.map((item, index) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            description={item.description}
                            icon={item.icon}
                            selected={item.label === category}
                        />))
                }


            </div>
        </Container>
    )
};

export default Categories;