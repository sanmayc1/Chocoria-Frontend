import { Button } from "@mui/material"

const DeleteDailog = ({ cancel, confirm, message, title,btnName ,rejectBtnName}) => {
    return (
        <div className="px-">
            <h1 className="text- font-semibold" >{title} </h1>
            <p className=" text-gray-500 text-sm pt-2" >{message}</p>
            <div className="flex justify-end pt-2">
                <Button size="small" onClick={cancel}>{rejectBtnName ?rejectBtnName:"cancel"}</Button>
                <Button size="small" onClick={confirm}>{btnName ?btnName:"delete"}</Button>
            </div>
        </div>
    )
}

export default DeleteDailog