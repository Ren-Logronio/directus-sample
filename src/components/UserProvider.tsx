import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useLocation } from "react-router-dom";
import { directusClient } from "../directus";
import { readMe } from "@directus/sdk";

export interface UserState {
    user: any,
    setUser: StateUpdater<any>
}

export const UserContext = createContext<UserState | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        directusClient.request(readMe()).then(res => {
            setUser(res);
        }).catch(err => {
            console.log("not logged in");
        });
    }, [pathname]);

    return <UserContext.Provider value={({ user, setUser })}>{children}</UserContext.Provider>
}