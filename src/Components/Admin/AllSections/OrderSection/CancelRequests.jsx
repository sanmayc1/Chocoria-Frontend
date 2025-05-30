import { useEffect, useState } from "react";
import Modal from "../../../HelperComponents/Modal.jsx";
import {
  getAllCancelRequests,
  updateCancelRequest,
} from "../../../../Services/api/orders.js";
import { Eye } from "lucide-react";
import CancelReturnModal from "./CancelReturnModal.jsx";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const CancelRequests = () => {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchCancelRequests = async () => {
      setLoading(true)
      const response = await getAllCancelRequests();
      if (response.status === 200) {
        setCancelRequests(response.data.cancelRequests);
        setLoading(false)
        return;
      }
    };
    fetchCancelRequests();
  }, [update]);

  const openModal = (details) => {
    setSelectedRequest(details);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
    setIsOpenReject(false);
    setRejectReason("");
  };

  const handleRejectAndApprove = async (action, requestId, reason) => {
    
    if(reason.trim().length < 10){
      toast.error("Explanation must be at least 10 characters long", {
        position: "top-center",
        autoClose: 1000,
        style: { width: "100%" },
      });
      return;
    }
    closeModal();
    const response = await updateCancelRequest(requestId, {
      status: action,
      response: reason,
    });
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
      autoClose: 1000,
    });
    closeModal();
  };

  const handleReject = () => {
    setIsOpenReject(true);
    setIsOpen(false);
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }
  return (
    <>
      <div className="p-10">
        <div className="bg-white  w-full rounded-lg shadow-md p-6">
          <h5 className="text-xl  font-bold pb-2">Cancel Requests</h5>

          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border rounded-3xl">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      item
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      detailed view
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cancelRequests.length > 0 ? cancelRequests?.map((request) => (
                    <tr className="bg-white border-b  " key={request._id}>
                      <td className="px-6 py-4 font-medium ">
                        #{request.orderId.uniqueOrderId}
                      </td>
                      <td className="px-6 py-4">{request.orderItem.name}</td>
                      <td className="px-6 py-4 text-orange-300">
                        {request.orderItem.status}
                      </td>
                      <td className="px-6 py-4">
                        {request.orderItem.variant.price *
                          request.orderItem.quantity}
                      </td>
                      <td className="px-14">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => openModal(request)}
                        >
                          <Eye />
                        </button>
                      </td>
                    </tr>
                  )): <td className="text-lg p-4 text-center w-full" colSpan={5}>No Cancel Request Found !</td>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <CancelReturnModal
        title={"Cancel Request"}
          selectedRequest={selectedRequest}
          handleRejectAndApprove={handleRejectAndApprove}
          handleReject={handleReject}
        />
      </Modal>
      <Modal isOpen={isOpenReject} onClose={() => setIsOpenReject(false)}>
        <div>
          <h1 className="text-gray-800 pb-5 font-medium">
            Please explain why you are rejecting this request?
          </h1>
          <div>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              name="response"
              placeholder="Enter reason"
              className="w-full border p-2"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end pt-3">
          <button
            className="bg-black text-white px-3 py-1 rounded-sm"
            onClick={() => {
              handleRejectAndApprove(
                "rejected",
                selectedRequest._id,
                rejectReason
              );
            }}
          >
            Reject
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CancelRequests;
