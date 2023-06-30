'use client' // TODO: this should be client

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "../navBar/Categories";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { UiContext } from "../../contexts/ui/UiProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}


const ListingClient = ({
    listing,
    currentUser,
    reservations = [],
}) => {


    const { onOpenLoginModal } = useContext(UiContext);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const router = useRouter();

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) return onOpenLoginModal()
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id,
        })
            .then(res => {
                toast.success("Reserva creada con éxito");
                setDateRange(initialDateRange);
                router.push('/trips');
            })
            .catch(err => {
                toast.error("Ocurrió un error al crear la reserva");
            })
            .finally(() => {
                setIsLoading(false);
            }
            )
    }, [currentUser, onOpenLoginModal, totalPrice, dateRange.startDate, dateRange.endDate, listing.id, router])


    useEffect(() => {



        // REVIEW: He's using const instead
        let dayCount;

        if (dateRange.startDate && dateRange.endDate) {
            dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
        }
        if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
        } else {
            setTotalPrice(listing.price);
        }
    }, [dateRange, listing.price])




    // TODO: This is not updating the disabled dates when the user creates a reservation and goes back to the listing page
    const disabledDates = useMemo(() => {
        let dates = [];

        // accumulates all the dates from the reservations in the array
        reservations.forEach(reservation => {
            const range = eachDayOfInterval({ start: new Date(reservation.startDate), end: new Date(reservation.endDate) });
            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find(category => category._id === listing.categoryId);
    }, [listing]);

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
                md:grid-cols-7
                md:gap-10
                mt-6
                ">


                    <ListingInfo
                        user={JSON.parse(JSON.stringify(currentUser))}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="
                    order-first
                    mb-10
                    md:order-last
                    md:col-span-3
                    ">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChange={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}

                        />
                    </div>
                </div>
            </div>
        </Container>
    )
};


export default ListingClient;