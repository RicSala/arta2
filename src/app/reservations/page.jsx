import EmptyState from "../../../components/EmptyState";

import { getCurrentUser } from "../../../actions/getCurrentUser";
import { getReservations } from "../../../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="No has iniciado sesión"
                description="Inicia sesión para ver tus reservas"
            />)
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (!reservations.length) {
        return (
            <EmptyState
                title="No tienes reservas"
                description="Ayuda a tus potenciales clientes a encontrar tu casa" />
        )
    }


    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
};
export default ReservationsPage;