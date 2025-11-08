import axios from "./src/utils/axios.customize"
import { useEffect } from "react"


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
      hello word
    </>
  )
}

export default App
