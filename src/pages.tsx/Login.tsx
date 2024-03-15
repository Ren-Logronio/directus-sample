import { useContext, useEffect, useState } from "preact/hooks";
import { directusClient } from "../directus";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookie from "cookiejs";
import axios from "axios";
import { readMe } from "@directus/sdk";
import { UserContext } from "../components/UserProvider";

export default function Login() {
    const navigate = useNavigate();
    const { user, loading } = useContext<any>(UserContext);
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const [loginForm, setLoginForm] = useState({ email: "", password: "", loading: false });

    const loginHandler = async () => {
        setLoginForm({ ...loginForm, loading: true });
        directusClient.login(loginForm.email, loginForm.password).then(res => {
            setLoginForm({ email: "", password: "", loading: false });
            navigate("/home");
        }).catch(err => {
            console.log("error:", err)
            setLoginForm({ ...loginForm, loading: false });
        });
    };

    useEffect(() => {
        if (user) {
            if (urlSearchParams.get('logout') !== null) {
                directusClient.logout().then(() => {
                    navigate(0);
                });
                return;
            };
            navigate("/home");
        }
    }, [user, loading]);

    return <div className="relative flex flex-col min-h-[100vh] min-w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-2 border border-gray-400  min-w-[512px] space-y-3">
            <p class="text-center">Login</p>
            <div className="flex flex-col min-w-full">
                <p className="m-0">Email</p>
                <input disabled={loginForm.loading} className="border border-slate-300 p-2" type="email" value={loginForm.email} onChange={(e: any) => { setLoginForm({ ...loginForm, email: e.target.value }) }} />
            </div>
            <div className="flex flex-col min-w-full">
                <p className="m-0">Password</p>
                <input disabled={loginForm.loading} className="border border-slate-300 p-2" type="password" value={loginForm.password} onChange={(e: any) => { setLoginForm({ ...loginForm, password: e.target.value }) }} />
            </div>
            <input disabled={loginForm.loading} type="submit" className="border border-gray-400 rounded-sm p-2 hover:text-white hover:bg-gray-800 cursor-pointer" value="Login" onClick={loginHandler} />
        </div>
    </div>
}