import { useState } from "preact/hooks";
import { Navigate } from "react-router-dom";
import { directusClient } from "../directus";
import { refresh } from "@directus/sdk";

export default function Protected({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("x");

    // const refreshToken = localStorage.getItem("refresh_token") || "";

    // directusClient.request(refresh('cookie')).then(res => {
    //     console.log("refreshed:", res);
    // }).catch(err => {
    //     console.log("error:", err);
    // });

    // directusClient.getToken().then(val => {
    //     if (!val) {
    //         directusClient.refresh().then(res => {
    //             console.log(res)
    //         }).catch(err => {
    //             console.log("error:", err);
    //         });
    //         return;
    //     }

    //     setToken(val);
    // }).catch(err => {
    //     console.log("error:", err);
    // }).finally(() => {
    //     setLoading(false);
    // });

    return <>
        {
            loading ? <p>Wait...</p>
                :
                <>
                    {
                        token ?
                            <>{children}</>
                            :
                            <Navigate to="/login" />
                    }
                </>
        }
    </>;
}