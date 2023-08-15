import useUser from "../hooks/useUser"
import { LogOut } from "../services/login"

export default function User(){
    const {user, loading} = useUser()
    if(loading) return <></>
    return(
        <div className="grid gap-4 p-4">
            <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} className="rounded-full" />
            <h2 className="text-xl font-semibold text-center">{user?.global_name}</h2>
            <button onClick={LogOut} className="px-4 py-2 text-white bg-black rounded-lg">LogOut</button>
        </div>
    )
}