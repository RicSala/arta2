'use client'

import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import ListingCard from "../../../components/listings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ReservationsClient = ({
    reservations,
    currentUser,
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState(null)

    const onCanceled = useCallback((id) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reserva cancelada")
                router.refresh()
            })
            .catch(() => {
                toast.error("Error al cancelar la reserva")
            })
            .finally(() => {
                setDeletingId(null)
            }
            )
    }, [router])


    return (
        <Container>
            <Heading
                title="Reservas"
                subtitle="Reservas de tus propiedades" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map(reservation => {
                    return (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            currentUser={currentUser}
                            actionId={reservation.id}
                            onAction={onCanceled}
                            loading={deletingId === reservation.id}
                            actionLabel={deletingId === reservation.id ? "Cancelando" : "Cancelar"}
                            disabled={deletingId === reservation.id}
                        />
                    )
                })}


            </div>
        </Container>
    )
};
export default ReservationsClient;