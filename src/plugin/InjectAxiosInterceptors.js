import { useEffect } from "react"
import { setupInterceptors } from "./http"

import { useNavigate } from 'react-router-dom';
function InjectAxiosInterceptors () {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('this effect is called once')
    setupInterceptors(navigate)
  }, [navigate])

  // not rendering anything
  return null
}
export default InjectAxiosInterceptors;