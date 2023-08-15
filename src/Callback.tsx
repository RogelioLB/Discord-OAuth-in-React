import { useEffect, useState } from "react"
import useParams from "./hooks/useParams"
import { ValidateCode } from "./services/login"

export default function Callback(){
    const params = useParams()
    const [error,setError] = useState(false)

    useEffect(()=>{
        const code = params.get("code")
        if(!code) return setError(true)
        ValidateCode(code).then((data)=>{
            if(data.error) return setError(true)
            const {access_token,refresh_token,expires_in} = data;
            const expiration_date = new Date()
            expiration_date.setTime((expires_in*1000)+expiration_date.getTime())
            localStorage.setItem('access_token',access_token)
            localStorage.setItem('refresh_token',refresh_token)
            localStorage.setItem('expiration_date',expiration_date.toString())
            location.replace("/")
        })
    },[])

    return(
        <>
            {error && <p>Ocurrio un error <a href="/">Volver</a></p>}
        </>
    )
}