import { Button } from "@mui/material"
import SingleInputField from "../../../../HelperComponents/InputFiled/SingleInputField.jsx"


const CategoryAddEditForm = ({onClose,addOrUpdate,handleChange,value,title})=>{
    return (
      <>
      <div>
        
        <h1 className="font-semibold text-xl text-center pb-5 " >{title}</h1>
        
        <SingleInputField placeholder={"Category Name"} value={value} handleChange={handleChange}/>
        <div className="flex justify-center gap-3 py-4">
            <Button style={{backgroundColor:"black" ,color:"white"}} onClick={onClose} >Cancel</Button>
            <Button style={{backgroundColor:"black" ,color:"white"}} onClick={addOrUpdate} >Add</Button>
        </div>
      </div>
      </>
    )
}

export default CategoryAddEditForm