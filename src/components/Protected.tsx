import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { user } = useContext<any>(UserContext);

    useEffect(() => {
        console.log("user:", user);
    }, [])

    return <>
        {
            <>
                {
                    !!user ?
                        <>{children}</>
                        :
                        <Navigate to="/login" />
                }
            </>
        }
    </>;
}