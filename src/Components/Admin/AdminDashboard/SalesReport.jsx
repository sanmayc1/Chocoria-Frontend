import { useEffect, useState } from "react";
import {
  ChartNoAxesCombined,
  HandCoins,
  BadgePercent,
  ChartColumnIncreasing,
} from "lucide-react";
import QuickStatCard from "../HelperComponents/QuickCard.jsx";
import { Button, Pagination } from "@mui/material";
import { utils, writeFile } from "xlsx";
import { getDeliveredOrders } from "../../../Services/api/orders.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
const OrderSection = () => {
  const initialData = { fromDate: "", toDate: "", year: "", date: "" };
  const [filterOrders, setFilterOrders] = useState(initialData);
  const currentYear = new Date().getFullYear();
  const earliestYear = currentYear - 5;
  const years = Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, i) => earliestYear + i
  );
  const [selectedFilter, setSelectedFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchAllOrders() {
      const response = await getDeliveredOrders();

      if (response.status === 200) {
        setData(response.data.orders);
        setOrders(response.data.orders);
        return;
      }
    }
    fetchAllOrders();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "fromDate") {
      if (filterOrders.toDate && e.target.value > filterOrders.toDate) {
        toast.error(
          "The 'From' date must be earlier than the 'To' date. Please select valid dates.",
          {
            theme: "dark",
            autoClose: 3000,
            position: "top-center",
            style: { width: "100%" },
          }
        );
        return;
      }
    }
    setFilterOrders({ ...filterOrders, [e.target.name]: e.target.value });
  };

  const filter = () => {
    if (filterOrders.fromDate && filterOrders.toDate) {
      setOrders(
        data.filter((order) => {
          return (
            order.orderId.orderDate.split("T")[0] >= filterOrders.fromDate &&
            filterOrders.toDate >= order.orderId.orderDate.split("T")[0]
          );
        })
      );
      return;
    } else if (selectedFilter === "specificPeriod") {
      toast.error(
        `Please Select ${
          !filterOrders.toDate && !filterOrders.fromDate
            ? "Period"
            : filterOrders.fromDate
            ? "To Date"
            : "From Date"
        } `,
        {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        }
      );
      return;
    }
    if (selectedFilter === "yearly") {
      if (!filterOrders.year) {
        toast.error("Please Select Year", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
        return;
      }
      setOrders(
        data.filter(
          (order) => order.orderId.orderDate.split("-")[0] === filterOrders.year
        )
      );
      return;
    }
    if(selectedFilter === "day"){
      if(!filterOrders.date){
        toast.error("Please Select Date", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
        return;
      
      }

      setOrders(data.filter((order)=>order.orderId.orderDate.split("T")[0] === filterOrders.date))

    }
  };

  useEffect(() => {
    if (selectedFilter === "today") {
      const date = new Date().toISOString().split("T")[0];
      setOrders(
        data.filter((order) => order.orderId.orderDate.split("T")[0] === date)
      );
      return;
    }
    if (selectedFilter === "week") {
      const today = new Date();
      const day = today.getDay();

      let monday = new Date(today);
      monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
      monday.setHours(0, 0, 0, 0);

      let sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      sunday = sunday.toISOString().split("T")[0];
      monday = monday.toISOString().split("T")[0];

      setOrders(
        data.filter(
          (order) =>
            order.orderId.orderDate.split("T")[0] <= sunday &&
            order.orderId.orderDate.split("T")[0] >= monday
        )
      );
      return;
    }

    if (selectedFilter === "month") {
      const thisMonth = new Date().getMonth() + 1;
      const thisYear = new Date().getFullYear();  
      setOrders(
        data.filter(
          (order) => order.orderId.orderDate.split("-")[1] == thisMonth && order.orderId.orderDate.split("-")[0] == thisYear
        )
      );
      return;
    }
    setOrders(data);
  }, [selectedFilter]);

  const filterRest = () => {
    setFilterOrders(initialData);
    setSelectedFilter("");
    setOrders(data);
  };

  const totalOfferDiscount = orders.reduce(
    (acc, order) => acc + order.offerDiscount,
    0
  );
  const totalCouponDiscount = orders.reduce(
    (acc, order) => acc + order.couponDiscount,
    0
  );
  const totalDiscount = totalOfferDiscount + totalCouponDiscount;
  const totalSalesAmount = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmountAfterDiscount,
    0
  );

  function exportToExcel() {
    const ws = utils.aoa_to_sheet([
      [
        "Order ID",
        "Order Date",
        "Customer Name",
        "Product",
        "Quantity",
        "Total Amount",
        "Offer Discount",
        "Coupon Discount",
        "Net Amount",
      ],
      ...orders.map((order) => [
        order.orderId.uniqueOrderId,
        order.orderId.orderDate.split("T")[0],
        order.orderId.shippingAddress.name,
        order.name,
        order.quantity,
        order.totalPrice,
        order.offerDiscount,
        order.couponDiscount,
        order.totalAmountAfterDiscount,
      ]),
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "Overall Summary",
        "",
        "",
        "",
        "",
        totalSalesAmount,
        totalOfferDiscount,
        totalCouponDiscount,
        totalRevenue,
      ],
    ]);
    const wsCols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 25 },
      { wch: 10 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
    ];
    ws["!cols"] = wsCols;
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sales Report");

    writeFile(wb, "SalesReport.xlsx");
  }

  const exportToPdf = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Order ID",
      "Order Date",
      "Customer Name",
      "Product",
      "Quantity",
      "Total Amount",
      "Offer Discount",
      "Coupon Discount",
      "Net Amount",
    ];
    const tableRows = [
      ...orders.map((order) => [
        order.orderId.uniqueOrderId,
        order.orderId.orderDate.split("T")[0],
        order.orderId.shippingAddress.name,
        order.name,
        order.quantity,
        order.totalPrice,
        order.offerDiscount,
        order.couponDiscount,
        order.totalAmountAfterDiscount,
      ]),
      ["", "", "", "", "", "", "", "", ""],
      [
        "Overall Summary",
        "",
        "",
        "",
        "",
        totalSalesAmount,
        totalOfferDiscount,
        totalCouponDiscount,
        totalRevenue,
      ],
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });
    doc.save("SalesReport.pdf");
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard
            title="Total Sales"
            value={orders.length}
            icon={<ChartColumnIncreasing color="green" />}
          />
          <QuickStatCard
            title="Total Sales Amount"
            value={`₹ ${totalSalesAmount}`}
            icon={<HandCoins color="blue" />}
          />
          <QuickStatCard
            title="Total Discount"
            value={`₹ ${totalDiscount}`}
            icon={<BadgePercent color="red" />}
          />
          <QuickStatCard
            title="Total Revenue"
            value={`₹ ${totalRevenue}`}
            icon={<ChartNoAxesCombined color="green" />}
          />
        </div>
        <div className="flex justify-end gap-3 px-2">
          <button
            className="bg-gray-900 hover:bg-gray-700 transition-colors rounded-sm duration-300 text-white p-2"
            onClick={exportToExcel}
          >
            Download Excel
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-700 transition-colors rounded-sm duration-300 text-white p-2"
            onClick={exportToPdf}
          >
            Download PDF
          </button>
        </div>
        {/* Main Customer List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-xl font-medium">Sales Report</h2>
            </div>
            <div className="pt-6 flex gap-5 items-end">
              <label
                htmlFor="filter"
                className="w-[20%] flex flex-col font-medium gap-2"
              >
                Filter
                <select
                  name="seletedFilter "
                  className="border p-1 w-full"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="specificPeriod">Sepecific Period</option>
                  <option value="day">Specific Date</option>
                  <option value="yearly">Yearly</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </label>

              {selectedFilter === "specificPeriod" && (
                <>
                  <label
                    htmlFor="fromDate"
                    className=" flex flex-col gap-2 text-sm font-semibold"
                  >
                    From Date
                    <input
                      type="date"
                      className="border p-2 uppercase rounded-md "
                      name="fromDate"
                      value={filterOrders.fromDate}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="fromDate"
                    className=" flex flex-col gap-2 text-sm font-semibold"
                  >
                    To Date
                    <input
                      type="date"
                      className="border p-2 uppercase rounded-md"
                      name="toDate"
                      value={filterOrders.toDate}
                      onChange={handleChange}
                      disabled={!filterOrders.fromDate}
                      min={filterOrders.fromDate}
                    />
                  </label>
                </>
              )}
              {selectedFilter === "yearly" && (
                <select
                  name="year"
                  value={filterOrders.year}
                  onChange={handleChange}
                  className="border p-2 w-[10%]"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              )}

              {
                selectedFilter === "day" && 
                <label
                htmlFor="fromDate"
                className=" flex flex-col gap-2 text-sm font-semibold"
              >
                Date
                <input type="date" className="border p-2 uppercase rounded-md" value={filterOrders.date} name="date" onChange={handleChange}/>
               </label>
              }

              {selectedFilter &&
                selectedFilter !== "today" &&
                selectedFilter !== "week" &&
                selectedFilter !== "month" && (
                  <div className="flex gap-3">
                    <Button
                      variant="outlined"
                      className="h-10"
                      onClick={filter}
                    >
                      Apply filter
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      className="h-10"
                      onClick={filterRest}
                    >
                      reset
                    </Button>
                  </div>
                )}
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Product
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Offer Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Coupon Discount
                  </th>
                  <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Net Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 ">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-gray-900">
                        {order.orderId.uniqueOrderId}
                      </div>
                      <div className="text-sm text-gray-500"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {order.orderId.orderDate.split("T")[0]}
                      </div>
                    </td>

                    <td className="pl-4">
                      <span className="px-2 text-sm">
                        {order.orderId.shippingAddress.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        {order.name.length < 22
                          ? order.name
                          : order.name.slice(0, 22) + "..."}
                      </span>
                    </td>
                    <td className="px-10 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">
                        {order.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.totalPrice}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.offerDiscount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.couponDiscount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.totalAmountAfterDiscount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

     
      </div>
    </>
  );
};

export default OrderSection;
