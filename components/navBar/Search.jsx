'use client'

import { Bisearch } from 'react-icons/bi';
import { UiContext, UiProvider } from '../../contexts/ui/UiProvider';
import { useContext } from 'react';

const Search = () => {

    const { onOpenSearchModal } = useContext(UiContext);


    return (
        <div
            onClick={onOpenSearchModal}
            className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        "
        >
            {/* This div stablishes how the inner elements are distributed */}
            <div className="
            flex
            flex-row
            items-center
            justify-between
            ">

                <div className="
                text-sm
                font-semibold
                px-6
                ">
                    Anywhere
                </div>

                <div className="
                hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                    Any Week
                </div>

                <div
                    className="
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                    flex
                    flex-row
                    items-center
                    gap-3
                    ">
                    <div className="hidden sm:block"> Add Guests</div>
                    <div className="
                      p-2
                      bg-rose-500
                      rounded-full
                      text-white  
                    ">
                        {/*TODO:  For some reason the icon is not working, */}
                        {/* <Bisearch /> */}



                    </div>
                </div>



            </div>


        </div>
    )
};

export default Search;