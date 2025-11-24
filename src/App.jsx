import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./utils/axios.customize"
import { useEffect } from "react"
import Footer from "./components/layout/footer";


function App() {

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/api/v1`);
      console.log(">>> check res: ", res)
    }
    fetchHelloWorld();
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
