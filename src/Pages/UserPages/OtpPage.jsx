import { useParams } from "react-router-dom"
import Otp from "../../Components/User/Otp/Otp.jsx"


const OtpPage = ()=>{
   const {id} =  useParams()
    return(
        <div className="flex justify-center h-screen items-center ">
            <Otp id={id} />
        </div>
    )
}
export default OtpPage