import { getCurrentUser } from "../../../actions/getCurrentUser";
import getFavoriteListings from "../../../actions/getFavoriteListings";
import EmptyState from "../../../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const page = async ({ }) => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="Aún no has guardado ningún favorito"
                subtitle="Selecciona tus favoritos para tenerlos siempre a mano"
            />
        )
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />)

};

export default page;