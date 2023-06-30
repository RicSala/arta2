'use client'

import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../../../components/listings/ListingCard";

const PropertiesClient = ({
    listings,
    currentUser

}) => {

    console.log(listings)


    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    const onCancel = useCallback(async (id) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Propiedad borrada")
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId(null)
            })
    }, [router, setDeletingId])

    return (
        <Container>
            <Heading
                title="Tus propiedades"
                subtitle="Lista de tus propiedades registradas"
            />

            <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            ">
                {
                    listings.map((listing) => {
                        return (
                            <ListingCard
                                key={listing.id}
                                data={listing}
                                actionId={listing.id}
                                onAction={onCancel}
                                disabled={deletingId === listing.id}
                                actionLabel={deletingId === listing.id ? "Borrando..." : "Borrar"}
                                currentUser={currentUser}
                            />
                        )
                    })
                }

            </div>


        </Container>
    )
};
export default PropertiesClient;