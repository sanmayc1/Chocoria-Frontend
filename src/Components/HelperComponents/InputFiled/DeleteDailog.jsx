import { Button } from "@mui/material"



const DeleteDailog = ({cancel ,confirm}) => {
    return (
        <div className="px-">
            <h1 className="text- font-semibold" >Delete</h1>
            <p className=" text-gray-500 text-sm pt-2" >{`Are you sure you want to delete this address ?`}</p>
            <div className="flex justify-end pt-2">
                <Button size="small" onClick={cancel}>Cancel</Button>
                <Button size="small" onClick={confirm}>Delete</Button>
            </div>
        </div>
    )
}

export default DeleteDailog