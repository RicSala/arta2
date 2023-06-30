import EmptyState from "../../../components/EmptyState";

import { getCurrentUser } from "../../../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../../../actions/getListings";


const TripsPage = async ({

}) => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const listings = await getListings({ userId: currentUser.id })

    if (!listings) {
        return (
            <EmptyState title="No tienes ninguna propiedad"
                subtitle="Registra tus propiedades para empezar a recibir reservas"
            />
        )
    }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
};
export default TripsPage;