import {  ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart,Bar, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis,Tooltip } from "recharts";
import { getDeliveredOrders, getTotalRevenue } from "../../../Services/api/orders.js";
const RevenueChart = ({selectedFilter}) =>{
    const [data ,setData]= useState([])
      useEffect(() => {
        async function fetchAllOrders() {
        
          const response = await getTotalRevenue(selectedFilter)
          if (response.status === 200) {
            setData(response.data.revenue);
            
            return;
          }
        }
        
        fetchAllOrders();
      }, [selectedFilter]);


    return(

        <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="filter" />
          <YAxis dataKey={"revenue"} />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="revenue" fill="#82ca9d" name={"Revenue"}  />
        </BarChart>
      </ResponsiveContainer>
    )
}

 export default RevenueChart