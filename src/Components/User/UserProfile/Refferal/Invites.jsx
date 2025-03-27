import { useEffect, useState } from "react";
import { getReferralList } from "../../../../Services/api/userApi.js";

const Invites = () => {
  const [invites, setInvites] = useState([]);
  useEffect(()=>{
   const fetchInvites = async()=>{
    const response = await getReferralList();
    if(response.status === 200){
      setInvites(response.data.invites)
    }
   }
   window.scrollTo({ top: 0, behavior: "smooth" });
   fetchInvites();
  },[])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Invited People</h1>
      <div className="flex flex-col gap-4">
        {invites.length > 0 ? invites.map((invite) => (
          <div
            key={invite._id}
            className="flex items-center justify-between p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold">{invite.referee.username}</p>
              <p>{invite.referee.email}</p>
              <p>{invite.createdAt.split("T")[0]}</p>
              <p className="text-green-600">₹{invite.amount}</p>
           </div>
          </div>
        )) : <p>No Invites Yet</p>}
      </div>
    </div>
  );
};

export default Invites;
