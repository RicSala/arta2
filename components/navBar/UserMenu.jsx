'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useContext, useState } from 'react';
import MenuItem from './MenuItem';
import { UiContext } from '../../contexts/ui/UiProvider';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserMenu = ({
    currentUser,
}) => {

    const router = useRouter();
    const { onOpenRegisterModal, onOpenLoginModal, onOpenRentModal } = useContext(UiContext);
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            onOpenLoginModal();
            return;
        }

        onOpenRentModal();
    }, [currentUser, onOpenLoginModal, onOpenRentModal])


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    "
                >
                    Airbnb your home
                </div>

                <div
                    onClick={toggleOpen}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    "
                >

                    <AiOutlineMenu size={20} />

                    <div className="hidden md:block">
                        <Avatar />
                    </div>

                </div>

            </div>

            {
                isOpen &&
                <div className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                ">

                    <div className="flex flex-col cursor-pointer">
                        {currentUser ?

                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label="My trips"
                                />
                                <MenuItem
                                    onClick={() => { router.push("/favorites") }}
                                    label="Mis favoritos"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={() => { router.push("/my-listings") }}
                                    label="Mis propiedades"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="Mi perfil"
                                />
                                <MenuItem
                                    onClick={onOpenRentModal}
                                    label="Airbnb my home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Salir"
                                />

                            </>
                            :
                            <>
                                <MenuItem
                                    onClick={onOpenLoginModal}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={onOpenRegisterModal}
                                    label="Sign Up"
                                />
                            </>}

                    </div>


                </div>
            }

        </div >
    )
};

export default UserMenu