'use client'

import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues } from 'react-hook-form';
import { useCallback, useContext, useState } from 'react';
import Modal from './Modal';
import { BiHeading } from 'react-icons/bi';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import { UiContext } from '../../contexts/ui/UiProvider';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = ({ }) => {

    const { RegisterModalisOpen, onCloseRegisterModal, onOpenRegisterModal, onOpenLoginModal } = useContext(UiContext);

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:
        {
            name: 'Ricardo',
            email: 'ricardo@google.com',
            password: '88888888',
            confirmPassword: '88888888',
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        axios.post('/api/signup', data)
            .then((res) => {
                onCloseRegisterModal();
            })
            .catch((err) => {
                toast.error(err.response?.data.error || 'Algo salió mal 🙄');
                console.log("ERROR:", err.response?.data.error);
                console.log("ERROR:", err);
            })
            .finally(() => {
                setIsLoading(false);
                toast.success('¡Bienvenido a Tattuo! 🎉');
            })
    };


    const toggleModal = useCallback(
        () => {
            onCloseRegisterModal();
            onOpenLoginModal();
        }
        , [onCloseRegisterModal, onOpenLoginModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Bienvenido a Tattuo"
                subtitle="Crea tu cuenta"
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="confirmPassword"
                label="Confirm password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

        </div>)

    const footerContent = (

        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Regístrate con Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />

            <div className="
            text-neutral-500
            text-center
            mt-4
            font-light
            ">
                <div className='
                flex flex-row justify-center items-center gap-2'>
                    <div>¿Ya tienes una cuenta?</div>
                    <div
                        onClick={toggleModal}
                        className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                    "
                    >Log in</div>

                </div>


            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModalisOpen}
            title="Regístrate"
            actionLabel={isLoading ? 'Cargando...' : 'Registrarme'}
            onClose={onCloseRegisterModal}
            onOpen={onOpenRegisterModal} // we are actually not using this prop
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModal;