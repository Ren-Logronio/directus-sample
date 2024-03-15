import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useLocation } from "react-router-dom";
import { directusClient } from "../directus";
import { readMe } from "@directus/sdk";

export interface UserState {
    user: any,
    loading: boolean,
    setUser: StateUpdater<any>
}

export const UserContext = createContext<UserState | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        directusClient.request(readMe()).then(res => {
            setUser(res);
            setLoading(false);
        });
    }, [location]);

    return <UserContext.Provider value={({ user, loading, setUser })}>{children}</UserContext.Provider>
}