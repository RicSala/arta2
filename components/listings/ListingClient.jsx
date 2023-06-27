'use client' // TODO: this should be client

import { useMemo } from "react";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "../navBar/Categories";


const ListingClient = ({
    listing,
    currentUser
}) => {


    const category = useMemo(() => {
        return categories.find(category => category._id === listing.categoryId);
    }, [listing]);

    console.log("current user", currentUser)

    // TODO: change this for the client version when we find the problem
    // const category = categories.find(category => category._id === listing.categoryId);
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={JSON.parse(JSON.stringify(listing.id))}
                        currentUser={currentUser}
                    />
                </div>

                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                md:gap-10
                mt-6
                ">


                    <ListingInfo
                        user={JSON.parse(JSON.stringify(currentUser))}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        // guessCount={listing.guessCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                </div>
            </div>
        </Container>
    )
};


export default ListingClient;