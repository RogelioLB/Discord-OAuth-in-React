import Callback from "./Callback"
import Loader from "./components/Loader"
import User from "./components/User"
import useUser from "./hooks/useUser"
import LoginWithDiscord from "./services/login"
import {Route,Switch} from "react-router-dom"

function App() {
  const {loading,user} = useUser()
  
  return (
    <main className='p-4 bg-white rounded-md shadow-md shadow-black/30'>
      {
        loading ? <Loader/> :  
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
