import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReferalUrl } from "../../../../Services/api/userApi.js";

const Referral = () => {
  const [referralLink , setReferralLink] = useState("")
  useEffect(()=>{
    const fetchUrl = async ()=>{
        const response = await getReferalUrl()
        if(response.status ===200){
            setReferralLink(response.data.referralUrl)
        }
    }
    fetchUrl()
  },[])
  const copyLink = () => {
    const linkText = document.getElementById("referralLink")
    linkText.select();
    linkText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(linkText.value)
    toast.success("Referral link copied to clipboard!",{
        position:'top-center',
        autoClose:1500,
        theme:'dark'
    })
  };

 
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Invite & Earn ₹50!</h1>

      <div>
        <p className="font-semibold pb-4">Share the joy and earn rewards!</p>
        <p>
          Invite your friends to join us and get ₹50 for every successful
          referral.
        </p>
        <p className="font-semibold py-3">How it works:</p>
        <ul className="px-5 list-decimal space-y-2 ">
          <li>Invite your friends using your unique referral link.</li>
          <li>Your friend signs up using your link</li>
          <li>You earn ₹50 instantly!</li>
        </ul>
      </div>
      <p className="py-4">Your Referral Link</p>
      <div className="flex gap-3">
        <button onClick={copyLink}>
          <Copy size={20} />
        </button>
        <input
          type="text"
          id="referralLink"
          value={referralLink}
          className="bg-gray-100 rounded-lg p-1 focus:outline-none"
          readOnly
        />
      </div>
    </>
  );
};

export default Referral;
