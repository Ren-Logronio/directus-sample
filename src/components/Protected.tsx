import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { user, loading } = useContext<any>(UserContext);

    return <>
        {loading ?
            <p>Wait...</p>
            :
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