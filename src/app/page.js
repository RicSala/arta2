import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/ListingCard";
import { getCurrentUser } from "../../actions/getCurrentUser";
import getListings from "../../actions/getListings";
export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// TODO: pending to solve this


export default async function Home({ searchParams }) {

  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser();


  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  // throw new Error("This is an error") // To test the Error component in the root of the app




  return (

    <Container>
      <div
        className="
    pt-24
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    "
      >
        {
          listings.map(listing => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))
        }
      </div>
    </Container>

  )
}
