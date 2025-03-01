import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const navaigateToSalesReport = () => {
        navigate("/admin/sales-report")
    }
  return (
    <>
    <div>
       <div className="flex justify-end items-center px-4  pt-5">
          <Button variant="contained" color="primary" onClick={navaigateToSalesReport}>sales report</Button>
       </div>
       {/* chart and all  */}
      <div className="flex h-screen bg-white m-4 w-full justify-center items-center"></div>
      </div>
    </>
  );
};

export default Dashboard;
