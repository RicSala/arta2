'use client'

import { useContext, useMemo, useState } from "react";
import { UiContext } from "../../contexts/ui/UiProvider";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navBar/Categories";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryInput from "../inputs/CategoryInput";
// import Map from "../Map";

// create an enum for the steps
const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5,
}

// INSIGHT! So far we have 3 types of elements:
// 1. Dumm elements: they receive props and funcionts and they render them (and call they functions when needed), but they don't have any state
// Examples: Heading, CategoryInput, Counter, ImageUpload, CountrySelect
// 2. "Template" elements: they are like a "template" for a modal, you can customize them later by passing props to them
// 3. "Stateful" elements: they have their own state
// are 1 and 2 the same thing??

const RentModal = ({ }) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    // We don't use register because it's not a controlled form. We are using the "watch" hook instead,
    // combined with the "setValue" hook
    // setValue does not trigger re-rendering, so we need to use "watch" to do that // TODO: check this 
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        defaultValues:
        {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });


    // we "watch" the values, constantly and when they change, the ui will re-render
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    // REVIEW: why do we need dynamic import here? --> Probably because this component is not rendered on the server-side, needs the browser to apis
    const Map = useMemo(() => {
        return dynamic(() => import('../Map'), {
            ssr: false,
        })
        // 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    const customSetValue = (field, value) => {
        setValue(field, value, {
            shouldValidate: true, // By default, setting the field value using setValue does not trigger validation. However, if you set shouldValidate to true, it will trigger validation for that field.
            shouldDirty: true,  // Marking a field as dirty means that its value has changed from the initial/default value
            shouldTouch: true, // Marking a field as touched means that the user has interacted with the field, even if it was not changed
        });

    }


    // This is a independent state that will be used to control the steps of the modal
    // it's not in the form "state" because we don't want to send it to the server...
    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () => {
        setStep((prev) => prev - 1);
    }

    const onNext = () => {
        setStep((prev) => prev + 1);
    }


    const onSubmit = (data) => {
        if (step !== STEPS.PRICE) {
            onNext();
            return;
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Tu casa ha sido publicada');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                onCloseRentModal();
            }
            )
            .catch(() => {
                toast.error('Algo salió mal');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }



    // const actionLabel = step === STEPS.PRICE ? "Publicar" : "Siguiente"; // we are gonna use "useMemo" here so the value is not calculated every time the component renders
    // We want to use useMemo because we don't want to calculate the value of the actionLabel every time the component renders
    // just when the value of the step changes
    const actionLabel = useMemo(() => {
        return step === STEPS.PRICE ? "Publicar" : "Siguiente";
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        return step === STEPS.CATEGORY ? undefined : "Atras";
    }, [step]);

    // Actually I think bodyContent could be memoized too
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title={'Cuál de estos describe mejor tu casa?'} subtitle={'Elige una categoría'} />
            <div
                className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        "
            >

                {
                    categories.map((item, index) => (
                        <CategoryInput
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                            onClick={
                                () => {
                                    customSetValue('category', item.label);
                                    // print the value of the category field
                                }
                            }
                        // it's not just customSetValue('category', category) because we are passing a function to the onClick prop, not the execution of the function
                        // also because we needed the category parameter which is coming from each category in the map
                        // REVIEW: Why is it different from https://github.com/AntonioErdeljac/next13-airbnb-clone/blob/master/app/components/modals/RentModal.tsx
                        />))}

            </div>
        </div>
    );



    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={'Dónde está ubicada tu casa?'} subtitle={'Ingresa una ubicación'} />

                <CountrySelect
                    onChange={(value) => customSetValue('location', value)}
                    value={location}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }



    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={'Cuéntanos un poco más de tu casa'} subtitle={'¿Qué servicios tiene?'} />
                <Counter
                    title="Huéspedes"
                    subtitle="¿Cuántos pueden quedarse?"
                    value={guestCount}
                    onChange={(value) => customSetValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Habitaciones"
                    subtitle="¿Cuántas tiene?"
                    value={roomCount}
                    onChange={(value) => customSetValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Baños"
                    subtitle="Cuántos baños tiene tu casa?"
                    value={bathroomCount}
                    onChange={(value) => customSetValue('bathroomCount', value)}
                />
                <hr />
            </div>
        )
    }



    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={'Agrega fotos de tu casa'} subtitle={'Selecciona las mejores fotos'} />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => customSetValue('imageSrc', value)}
                />
            </div>
        )
    }

    // REVIEW: It's mixing the values from price with title and not triggering the validation
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={'Agrega un título y una descripción'} subtitle={'¿Qué hace a tu casa especial?'} />

                <Input
                    id="title"
                    label="Título"
                    disable={isLoading}
                    errors={errors}
                    required={true}
                    register={register}
                />
                <hr />
                <Input
                    id="description"
                    label="Descripción"
                    disable={isLoading}
                    errors={errors}
                    required={true}
                    register={register}
                />


            </div>

        )
    }


    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={'¿Cuánto quieres cobrar por noche?'} subtitle={'Elige un precio'} />
                <Input
                    id="price"
                    label="Precio"
                    formatPrice
                    type="number"
                    disable={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }





    const { RentModalisOpen, onCloseRentModal, onOpenRentModal } = useContext(UiContext);
    return (
        <Modal
            title="Airbnb your home"
            isOpen={RentModalisOpen}
            onClose={onCloseRentModal}
            onOpen={onOpenRentModal}
            onSubmit={
                step === STEPS.PRICE ? handleSubmit(onSubmit) : onNext
            }
            actionLabel={actionLabel}
            disabled={false}
            secondaryAction={
                step === STEPS.LOCATION || step === STEPS.INFO || step === STEPS.IMAGES || step === STEPS.DESCRIPTION || step === STEPS.PRICE ? onBack : undefined
            }
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />

    )
};

export default RentModal;