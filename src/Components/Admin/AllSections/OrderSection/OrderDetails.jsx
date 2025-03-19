import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  adminGetOrderDetails,
  adminUpdateOrderStatus,
} from "../../../../Services/api/orders";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../Services/api/constants";
import Modal from "../../../HelperComponents/Modal.jsx";
import DeleteDailog from "../../../HelperComponents/DeleteDailog.jsx";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenConfirmDelivered, setIsOpenConfirmDelivered] = useState(false);
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
  }, [id, update]);

  const handleStatusChange = async (e, id) => {
    const { value } = e.target;
    if (value === "cancelRequest") {
      setSelectedId(id);
      setIsOpen(true);
      return;
    }
    if (value === "confirmDelivered") {
      setSelectedId(id);
      setIsOpenConfirmDelivered(true);
      return;
    }
    const response = await adminUpdateOrderStatus(id, { status: value });
    if (response.status === 200) {
      setUpdate(!update);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const confrimCancelOrder = async () => {
    setIsOpen(false);
    handleStatusChange({ target: { value: "Cancelled" } }, selectedId);
  };
  const confrimDeliveredOrder = async () => {
    setIsOpenConfirmDelivered(false);
    handleStatusChange({ target: { value: "Delivered" } }, selectedId);
  };

  return (
    <>
      <div className="p-10">
        <div className="bg-white  w-full rounded-lg shadow-md p-6">
          <h5 className="text-xl  font-bold pb-2">Order Details</h5>
          <p className="text-gray-500"> {order?.uniqueOrderId}</p>
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
                        {item.status !== "Cancelled" &&
                        item.status !== "Delivered" && item.status !=="Order Not Placed" ? (
                          <select
                            name="status"
                            className="p-2 text-gray-800"
                            value={item.status}
                            onChange={(e) => handleStatusChange(e, item._id)}
                          >
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
                              value="confirmDelivered"
                            >
                              Delivered
                            </option>
                            <option
                              className="p-2 text-red-600"
                              value="cancelRequest"
                            >
                              Cancelled
                            </option>
                          </select>
                        ) : (
                          <p
                            className={`${
                              item.status === "Delivered"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.status}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-800">
                          ₹ {item.totalAmountAfterDiscount}
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DeleteDailog
          title={"Confirm cancel order"}
          message={
            "Are you sure you want to cancel this order? Please note that once the order is canceled, this action cannot be undone."
          }
          confirm={confrimCancelOrder}
          btnName={"confirm"}
          cancel={() => setIsOpen(false)}
          rejectBtnName={"cancel"}
        />
      </Modal>
      <Modal
        isOpen={isOpenConfirmDelivered}
        onClose={() => setIsOpenConfirmDelivered(false)}
      >
        <DeleteDailog
          title={"Order Delivered"}
          message={
            "Please confirm that this order has been delivered. If this order was placed using Cash on Delivery (COD), the payment status will be updated to 'Paid'. Ensure all details are correct before proceeding, as changes cannot be made after confirmation."
          }
          confirm={confrimDeliveredOrder}
          btnName={"confirm"}
          cancel={() => setIsOpenConfirmDelivered(false)}
          rejectBtnName={"cancel"}
        />
      </Modal>
    </>
  );
};

export default OrderDetails;
