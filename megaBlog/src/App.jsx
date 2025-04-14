import "./App.css"
import { useState,useEffect, use } from "react"
import useDispatch from "react-redux"
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {Header, Footer} from "./components/index"
import { Outlet } from "react-router-dom"
function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()
useEffect(() => {
  authService.getCurrentUser().then((user) => {
    if (user) {
      dispatch(login({user}))
    } else {
      dispatch(logout())
    }
  }
  ).finally(() => {
    setLoading(false)
  })
  .catch((error) => {
    console.error('Error fetching user:', error);
    setLoading(false)
  })
}, [])
  
  return (
    <div className="App">
      {loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-grey-400">
          <div className="w-full block">
            <Header/>
            <main>
              <Outlet/>
            </main>
            <Footer/>
          </div>
        </div> 
      ) : (
        <h1>please try again</h1>
      )}
    </div>
  )
}

export default App
