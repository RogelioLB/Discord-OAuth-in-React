/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DISCORD_CLIENT_ID: string
    readonly VITE_DISCORD_CLIENT_SECRET:string
    readonly VITE_REDIRECT_URI:string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }