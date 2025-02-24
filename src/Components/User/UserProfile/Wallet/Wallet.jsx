import { Notebook, QrCode, Tickets } from "lucide-react";
import { useEffect, useState } from "react";
import { getWallet } from "../../../../Services/api/walletApi";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  
    const [wallet, setWallet] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWallet = async () => {
           const res = await getWallet()
           if(res.status === 200){
            setWallet(res.data.wallet)
           }
        }
        fetchWallet()
    },[])

  return (
    <>
      <h1 className="text-2xl text-center font-semibold mb-6">Wallet</h1>
      <div className="w-full p-8 border border-gray-400 rounded-3xl h-fit flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl  font-semibold ">Total Wallet Balance</h1>
          <Tickets size={25} color="blue" fill="skyblue" />
        </div>
        <h2 className="text-4xl font-bold">₹{wallet?.balance}</h2>
        <div className="flex items-center gap-6 py-3">
          <div className="cursor-pointer">
            <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-full h-12 w-12 flex items-center justify-center ">
              <QrCode />
            </div>
            <p className="text-sm font-medium text-center p-1">Pay </p>
          </div>
          <div className="cursor-pointer" onClick={()=>navigate('/user/wallet/history')}>
            <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-full h-12 w-12 flex items-center justify-center ">
              <Notebook />
            </div>
            <p className="text-sm font-medium text-center p-1">History </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
