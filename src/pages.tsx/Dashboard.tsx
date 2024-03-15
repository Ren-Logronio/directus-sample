import { useContext, useEffect, useState } from "preact/hooks";
import { directusClient } from "../directus";
import { createItem, readItems, updateItem } from "@directus/sdk";
import cookie from "cookiejs";
import { fromUnixTime } from "date-fns";
import { UserContext } from "../components/UserProvider";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [todos, setTodos] = useState<any[]>([]);
    const { user } = useContext<any>(UserContext);
    const [loading, setLoading] = useState(true);
    const [todoForm, setTodoForm] = useState({ description: "", loading: false });

    useEffect(() => {
        directusClient.request(readItems('todos', { fields: ["*"], filter: { "author": { "_eq": "$CURRENT_USER" } } })).then(res => {
            setTodos(res.sort((a, b) => b.id - a.id));
            setLoading(false);
        }).catch(err => {
            console.log("error:", err);
        });
    }, []);

    const handleAddTodo = () => {
        setTodoForm({ ...todoForm, loading: true });
        directusClient.request(createItem('todos', { "description": todoForm.description, "author": user.id })).then((res: any) => {
            setTodos([res, ...todos]);
            setTodoForm({ description: "", loading: false });
            console.log("res:", res);
        }).catch(err => {
            console.log("err:", err);
        });
    };

    const markAsFinished = (id: string | number) => {
        directusClient.request(updateItem('todos', id, { "status": "finished" })).then(res => {
            setTodos(todos.map((i: any) => i.id === id ? { ...i, status: "finished" } : i));
            console.log("res:", res);
        }).catch(err => {
            console.log("err:", err);
        });
    }

    const markAsUnfinished = (id: string | number) => {
        directusClient.request(updateItem('todos', id, { "status": "unfinished" })).then(res => {
            setTodos(todos.map((i: any) => i.id === id ? { ...i, status: "unfinished" } : i));
            console.log("res:", res);
        }).catch(err => {
            console.log("err:", err);
        });
    }



    return <div className="flex flex-col justify-center items-center py-12">
        {
            loading ?
                <p>Wait...</p>
                :
                <>
                    <div className="flex flex-row justify-center space-x-9">
                        <Link to="/login?logout" className="border border-gray-400 rounded-sm p-2 hover:text-white hover:bg-gray-800 cursor-pointer">Logout</Link>
                    </div>
                    <div className="min-w-full md:min-w-[600px] lg:min-w-[900px] p-4">
                        <div class="relative flex flex-row justify-center items-center mb-4">
                            <input disabled={todoForm.loading} value={todoForm.description} onChange={(e: any) => { setTodoForm({ ...todoForm, description: e.target.value }) }} type="text" placeholder="Add Todo" className="min-w-full h-9 p-2 border border-gray-400 rounded-md" />
                            <button onClick={handleAddTodo} disabled={todoForm.loading || !todoForm.description} className={`absolute right-0 mr-2 ${!todoForm.description && "text-gray-500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                        { /* Glory be thy chrome v8 */}
                        {todos.filter((i: any) => i.status === "unfinished").length > 0 &&
                            <div className="flex flex-col justify-center space-y-2">
                                {
                                    todos.filter((i: any) => i.status === "unfinished").map((todo: any) => {
                                        return <div key={todo.id} className="flex flex-row items-center space-x-3">
                                            <input type="checkbox" className="size-4" defaultChecked={todo.status === "finished"} onChange={() => { markAsFinished(todo.id) }} />
                                            <p>{todo.description}</p>
                                        </div>
                                    })
                                }
                            </div>
                        }
                        {todos.filter((i: any) => i.status === "finished").length > 0 &&
                            <div className="flex flex-col justify-center space-y-2 mt-2">
                                <p className="mb-1">Finished tasks</p>
                                {
                                    todos.filter((i: any) => i.status === "finished").map((todo: any) => {
                                        return <div key={todo.id} className="flex flex-row items-center space-x-3">
                                            <input type="checkbox" className="size-4" defaultChecked={todo.status === "finished"} onChange={() => { markAsUnfinished(todo.id) }} />
                                            <p className="line-through">{todo.description}</p>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </>
        }
    </div>
}