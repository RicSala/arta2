'use client'

import { useEffect } from "react";
import EmptyState from "../../components/EmptyState";

const Error = ({
    error
}) => {

    useEffect(() => {
        console.error("error", error)
        // could also some analytics to send the error to 
    }, [error])

    return (
        <EmptyState
            title="oh oh!"
            description="Algo ha ido mal. Por favor, inténtalo de nuevo"
            showReset
        />
    )
};
export default Error;