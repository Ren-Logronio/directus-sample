import { useEffect, useState } from "preact/hooks";
import { directusClient } from "../directus";
import { useNavigate } from "react-router-dom";
import cookie from "cookiejs";

export default function Login() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ email: "", password: "", loading: false });

    const loginHandler = async () => {
        setLoginForm({ ...loginForm, loading: true });
        directusClient.login(loginForm.email, loginForm.password).then(res => {
            cookie.set("access_token", res.access_token || "");
            cookie.set("refresh_token", res.refresh_token || "");
            setLoginForm({ email: "", password: "", loading: false });
            navigate("/dashboard");
        }).catch(err => {
            console.log("error:", err)
            setLoginForm({ ...loginForm, loading: false });
        });
    }

    useEffect(() => {
        directusClient.getToken().then(val => {
            if (val) {
                navigate("/dashboard");
            }
        });
    }, [])

    return <>
        Login
        <div className="flex flex-col max-w-[300px] p-2 border border-gray-400 space-y-3">
            <input disabled={loginForm.loading} className="border border-slate-300" type="email" value={loginForm.email} onChange={(e: any) => { setLoginForm({ ...loginForm, email: e.target.value }) }} />
            <input disabled={loginForm.loading} className="border border-slate-300" type="password" value={loginForm.password} onChange={(e: any) => { setLoginForm({ ...loginForm, password: e.target.value }) }} />
            <input disabled={loginForm.loading} type="submit" value="Login" onClick={loginHandler} />
        </div>
    </>
}