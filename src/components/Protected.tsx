import { useEffect, useState } from "preact/hooks";
import { Navigate } from "react-router-dom";
import { directusClient } from "../directus";
import { refresh } from "@directus/sdk";
import cookie from "cookiejs";

export default function Protected({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    useEffect(() => {
        directusClient.request(refresh('json', cookie.get("refresh_token") || "x" as any)).then(res => {
            setToken(res.access_token || "");
        }).catch(err => {
            console.log("error:", err);
        }).then(() => {
            loading && setLoading(false);
        });
    }, []);

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