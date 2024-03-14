import { useEffect, useState } from "preact/hooks";
import { directusClient } from "../directus";
import { readItems } from "@directus/sdk";

export default function Dashboard() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log("dashing");
        directusClient.request(readItems('todos', { fields: ['*'] })).then(res => {
            console.log(res);
        }).catch(err => {
            console.log("error:", err);
        });
    }, [])


    return <>
        Todos
        <ul class='flex flex-col space-y-2'>

        </ul>
    </>
}