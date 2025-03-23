import { useEffect, useState } from "react";
import { resendOtp } from "../../../Services/api/api";

const Timer = ({id}) => {
  const [timeLeft, setTimeLef] = useState(70);
  // timer
  useEffect(() => {
    if (timeLeft < 1) return;
    const timer = setInterval(() => {
      setTimeLef((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  //   format time
  const formatTime = (timeLeft) => {
    const minute = Math.floor(timeLeft / 60);
    const second = timeLeft % 60;
    return `${minute} : ${second}`;
  };

  const resendOtp = async() => {
  const response = await resendOtp({id})
  if(response?.data?.success)
    setTimeLef(70);
  };


  return timeLeft > 0 ? (
    <p className="font-bold text-sm">{formatTime(timeLeft)}</p>
  ) : (
    <button className="text-sm font-semibold" onClick={resendOtp}>
      Resend OTP
    </button>
  );
};

export default Timer;
