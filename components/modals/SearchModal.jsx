'use client'

import { useCallback, useContext, useMemo, useState } from "react";
import { UiContext } from "../../contexts/ui/UiProvider";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

// We use the STEPS to render different content in the modal depending on the step we are in
const STEPS = {
    LOCATION: 0,
    DATE: 1,
    INFO: 2,
}

const SearchModal = ({
}) => {
    const { SearchModalisOpen, onOpenSearchModal, onCloseSearchModal } = useContext(UiContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [step, setStep] = useState(0);
    const [location, setLocation] = useState('');
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathRoomCount, setBathRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date(), key: 'selection' });

    // REVIEW: SSR (Server-Side Rendering) Compatibility: By specifying { ssr: false } in the dynamic import, it indicates that 
    // the Map component should not be rendered on the server-side. This is necessary when dealing with components that rely on client-side 
    // APIs or global objects that are not accessible during server-side rendering. It ensures that the component is only rendered and executed 
    // on the client-side, avoiding any compatibility issues.
    const Map = useMemo(() => {
        return dynamic(() => import('../Map'), {
            ssr: false,
        })
        // 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);


    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);


    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) { // if user is in the last step, label should be 'Buscar'
            return 'Buscar';
        }
        return 'Siguiente'; // otherwise, label should be 'Siguiente'
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) { // if user is in the first step, we don't show "Atras" (there are no previous steps)
            return undefined;
        }
        return 'Atras';
    }, [step]);



    const onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};
        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathRoomCount,
        };


        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        },
            {
                skipNull: true,
            }
        );

        setStep(STEPS.LOCATION);
        onCloseSearchModal();
        router.push(url);
    }, [bathRoomCount, dateRange.endDate, dateRange.startDate, guestCount, location, onCloseSearchModal, onNext, roomCount, router, searchParams, step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="¿Donde quieres ir?"
                subtitle="Encuentra tu lugar perfecto"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
            />
            <hr />
            {location ? (
                <Map center={location?.latlng} />
            ) : null}

        </div>

    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Cuando quieres ir?"
                    subtitle="Asegúrate de seleccionar bien tus fechas"
                />
                <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />

            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Cuántas personas van?"
                    subtitle="Que nadie se quede sin habitación!"
                />
                <Counter label="Huespedes" title="Huéspedes" subtitle="¿Cuántos sois?" value={guestCount} onChange={(value) => setGuestCount(value)} />
                <Counter label="Habitaciones" title="Habitaciones" subtitle="Piensa cómo os vais a repartir!" value={roomCount} onChange={(value) => setRoomCount(value)} />
                <Counter label="Baños" title="Baños" subtitle="¿Cuántos os hace falta?" value={bathRoomCount} onChange={(value) => setBathRoomCount(value)} />
            </div>
        )
    }







    return (
        <Modal
            title="Filtros"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={step === STEPS.LOCATION ? undefined : secondaryActionLabel}
            secondaryAction={onBack}
            isOpen={SearchModalisOpen}
            onClose={onCloseSearchModal}
            body={bodyContent}
        />

    )
};
export default SearchModal;