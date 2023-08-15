import Callback from "./Callback"
import Loader from "./components/Loader"
import User from "./components/User"
import useUser from "./hooks/useUser"
import LoginWithDiscord from "./services/login"
import {Route,Switch} from "react-router-dom"

function App() {
  const {loading,user} = useUser()

  console.log(user)
  
  return (
    <main className='grid h-screen m-auto max-w-7xl bg-slate-50 place-items-center'>
      {
        loading && !user ? <Loader/> :  
        <Switch>
          <Route exact path="/">
            {
            user ? 
            <User />
            :
            <button className="px-4 py-2 text-white bg-black rounded-lg " onClick={LoginWithDiscord}>Login with Discord</button>
            }
          </Route>
          <Route path="/auth/callback">
            <Callback />
          </Route>
        </Switch>
  }
    </main>
  )
}

export default App
