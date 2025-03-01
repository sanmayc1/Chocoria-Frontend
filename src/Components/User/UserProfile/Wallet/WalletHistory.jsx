import { Tickets } from "lucide-react";
import { useEffect, useState } from "react";
import { getWallet } from "../../../../Services/api/walletApi";

const WalletHistory = () => {
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await getWallet();
      if (res.status === 200) {
        setWallet(res.data.wallet);
      }
    };
    fetchWallet();
  }, []);
  return (
    <div className="w-full p-8 border border-gray-400 rounded-3xl h-fit flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl  font-semibold ">Total Wallet Balance</h1>
        <Tickets size={25} color="blue" fill="skyblue" />
      </div>
      <h2 className="text-4xl font-bold">₹{wallet?.balance || 0}</h2>

      <table className="w-full mt-3 ">
        <thead>
          <tr className="table-row h-12 ">
            <th className="text-left">Transaction ID</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Type</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>
        <tbody >
        {wallet?.transactions?.length > 0 ? (
          wallet?.transactions.map((transaction) => (
           
              <tr key={transaction._id} className="table-row h-12 ">
                <td className="text-left">{transaction.transactionId}</td>
                <td className="text-left">₹{transaction.amount}</td>
                <td
                  className={`text-left uppercase ${
                    transaction.type === "credit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type}
                </td>
                <td className="text-left">
                  {transaction.createdAt.split("T")[0]}
                </td>
              </tr>
            
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No transactions found
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletHistory;
