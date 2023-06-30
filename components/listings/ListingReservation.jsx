'use client'

import Button from "../Button";
import Calendar from "../inputs/Calendar";

const ListingReservation = ({
    price,
    totalPrice,
    onChange,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,

}) => {

    console.log("DISABLED DATES FROM RESERVATIONS", disabledDates)

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    {price} €
                </div>
                <div className="font-light text-neutral-600">
                    /noche
                </div>
            </div>
            <hr />

            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChange(value.selection)}
            />

            <hr />
            <div className="p-4">

                <Button
                    disabled={disabled}
                    onClick={onSubmit}
                    label="Reservar"
                />
            </div>

            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>{totalPrice} €</div>

            </div>

        </div>
    )
};
export default ListingReservation;