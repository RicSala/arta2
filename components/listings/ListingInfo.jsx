'use client'

import dynamic from "next/dynamic";
import useCountries from "../../hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useMemo } from "react";


const ListingInfo = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
}) => {

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [locationValue]);

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue).latlng;

    console.log("location", locationValue)

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className=" flex flex-col gap-2">

                <div className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                    ">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.avatar} />
                </div>
                <div className="
                flex
                flex-row
                items-center
                gap-4
                font-light
                text-neutral-500">
                    {/* <div>
                        {guessCount} personas
                    </div> */}
                    <div>
                        {guestCount} huéspedes
                    </div>
                    <div>
                        {roomCount} habitaciones
                    </div>
                    <div>
                        {bathroomCount} baños
                    </div>
                </div>
            </div>
            <hr />
            <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
};

export default ListingInfo;