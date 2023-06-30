'use client'

import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../../../components/listings/ListingCard";

const TripsClient = ({
    reservations,
    currentUser

}) => {

    console.log(reservations)


    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    const onCancel = useCallback(async (id) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reserva cancelada")
                router.refresh()
            })
            .catch((error) => {
                console.log("THERE WAS AN ERROR", error)
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId(null)
            })
    }, [router, setDeletingId])

    return (
        <Container>
            <Heading
                title="Tus viajes"
                subtitle="De dónde vienes y a dónde vas 😊"
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
                    reservations.map((reservation) => {
                        return (
                            <ListingCard
                                key={reservation.id}
                                data={reservation.listing}
                                reservation={reservation}
                                actionId={reservation.id}
                                onAction={onCancel}
                                actionLabel={deletingId === reservation.id ? "Cancelando..." : "Cancelar"}
                            />
                        )
                    })
                }

            </div>


        </Container>
    )
};
export default TripsClient;