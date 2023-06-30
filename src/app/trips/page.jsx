import EmptyState from "../../../components/EmptyState";

import { getCurrentUser } from "../../../actions/getCurrentUser";
import { getReservations } from "../../../actions/getReservations";
import TripsClient from "./TripsClient";


const TripsPage = async ({

}) => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const reservations = await getReservations({ userId: currentUser.id })

    if (!reservations) {
        return (
            <EmptyState title="No tienes ninguna reserva"
                subtitle="Reserva un viaje ahora"
            />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
};
export default TripsPage;