import { useEffect, useState } from "react";
import { RefresToken } from "../services/login";

interface User{
    avatar:string,
    global_name:string,
    username:string,
    id:string
}
export default function useUser(){
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState<User | null>(null)
    const [expiration_date,setExpirationDate] = useState(localStorage.getItem("expiration_date") as string)
    const [access_token,setAccessToken] = useState(localStorage.getItem("access_token") as string)
    const [refresh_token,setRefreshToken] = useState(localStorage.getItem("refresh_token") as string)

    useEffect(()=>{
        if(access_token && new Date(expiration_date).getTime() >= new Date().getTime()){
            setLoading(true)
            fetch("https://discord.com/api/users/@me",{
                headers:{
                    "Authorization": `Bearer ${access_token}`
                }
            }).then(res=>res.json()).then(data=>{
                setUser(data)
            }).finally(()=>setLoading(false))
        }else if(refresh_token){
            setLoading(true)
            RefresToken(refresh_token).then((data)=>{
                const {access_token,refresh_token,expires_in} = data;
                const expiration_date = new Date()
                expiration_date.setTime((expires_in*1000)+expiration_date.getTime())
                localStorage.setItem('access_token',access_token)
                localStorage.setItem('refresh_token',refresh_token)
                localStorage.setItem('expiration_date',expiration_date.toString())
                setAccessToken(access_token)
                setExpirationDate(expiration_date.toString())
                setRefreshToken(refresh_token)
                setLoading(false)
            })
        }
    },[access_token,refresh_token,expiration_date])

    return {user,loading}
}