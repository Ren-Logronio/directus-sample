import { AuthenticationData, AuthenticationStorage } from "@directus/sdk";
import cookie from "cookiejs";

export const authLocalStorage = (mainKey: string = import.meta.env.VITE_DIRECTUS_CLIENT_AUTH_STORAGE_NAME) => ({
    // implementation of get, here return json parsed data from localStorage at mainKey (or null if not found)
    get: async () => {
        const data = cookie.get(mainKey);
        if (data) {
            return JSON.parse(data as string);
        }
        return null;
    },
    // implementation of set, here set the value at mainKey in localStorage, or remove it if value is null
    set: async (value: AuthenticationData | null) => {
        if (!value) {
            return cookie.remove(mainKey);
        }
        return cookie.set(mainKey, JSON.stringify(value));
    },
} as AuthenticationStorage);