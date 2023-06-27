import getListingById from "../../../../actions/getListingById";
import ClientOnly from "../../../../components/ClientOnly";
import EmptyState from "../../../../components/EmptyState";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import ListingClient from "../../../../components/listings/ListingClient";
import TestComponent from "../../../../components/listings/TestComponent";
import ListingInfo from "../../../../components/listings/ListingInfo";
import Container from "../../../../components/Container";

const ListingPage = async ({ params }) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    return (

        <>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />

        </>
    )
};

export default ListingPage;