const token_post_url = "https://discord.com/api/oauth2/token"

export default function LoginWithDiscord(){
    const discord_link = `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=identify`
    location.replace(discord_link)
}

export async function ValidateCode(code:string){
    const res = await fetch(token_post_url,{
        body: new URLSearchParams({
            'client_id':import.meta.env.VITE_DISCORD_CLIENT_ID,
            'client_secret':import.meta.env.VITE_DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': import.meta.env.VITE_REDIRECT_URI
        }),
        method:"POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await res.json()
    return data
}

export async function RefresToken(refres_token:string) {
    const res = await fetch(token_post_url,{
        body: new URLSearchParams({
            'client_id':import.meta.env.VITE_DISCORD_CLIENT_ID,
            'client_secret':import.meta.env.VITE_DISCORD_CLIENT_SECRET,
            'grant_type': 'refresh_token',
            'refresh_token': refres_token,
        }),
        method:"POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await res.json()
    return data
}

export async function LogOut() {
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("expiration_date")
    localStorage.removeItem("access_token")
    location.reload()
}