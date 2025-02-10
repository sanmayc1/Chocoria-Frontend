import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminGetOrderDetails, adminUpdateOrderStatus } from "../../../../Services/api/orders";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../Services/api/constants";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await adminGetOrderDetails(id);
      if (response.status === 200) {
        setOrder(response.data.order);
        setOrderItems(response.data.orderItems);
        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
      });
    };
    fetchOrderDetails();
  }, [id,update]);

  const handleStatusChange = async (e,id) => {
    const {value} = e.target
    const response = await adminUpdateOrderStatus(id,{status:value})
    if (response.status === 200) {
      setUpdate(!update)
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      return
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
    });
     
  };

  return (
    <div className="p-10">
      <div className="bg-white  w-full rounded-lg shadow-md p-6">
        <h5 className="text-xl  font-bold pb-2">Order Details</h5>
        <p className="text-gray-500">order id : {id}</p>
        <div className=" py-5">
          <h5 className="font-medium pb-2">Shipping Address</h5>
          <p className="text-gray-500">{order?.shippingAddress.name}</p>
          <p className="text-gray-500">
            {order?.shippingAddress.detailed_address}
          </p>
          <p className="text-gray-500">
            {order?.shippingAddress.city} {order?.shippingAddress.pincode}
          </p>
          <p className="text-gray-500">{order?.shippingAddress.phone}</p>
        </div>
        <div>
          <h5 className="font-medium pb-2">Order Items</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border rounded-3xl">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr className="bg-white border-b  " key={item._id}>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <img
                        src={`${baseUrl}${item.img}`}
                        alt="product"
                        className="w-12 h-12 object-contain"
                      />
                      <span className="font-medium text-gray-800">
                        {" "}
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-800">
                        {item.variant.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <select name="status" className="p-2 text-gray-800" value={item.status} onChange={(e)=>handleStatusChange(e,item._id)}>
                       
                        <option
                          className="p-2 text-orange-400"
                          value="Pending"
                          
                        >
                          Pending
                        </option>
                        <option
                          className="p-2 text-orange-400"
                          value="Shipped"
                          
                        >
                          Shipped
                        </option>
                        <option
                          className="p-2 text-green-600"
                          value="Delivered"
                         
                        >
                          Delivered
                        </option>
                        <option
                          className="p-2 text-red-600"
                          value="Cancelled"
                          
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-800">
                        {item.variant.price * item.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
