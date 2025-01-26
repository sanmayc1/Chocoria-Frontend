import { useState } from "react"
import AddEditForm from "./Add-Edit-Form.jsx"
import { v4 as uuid } from "uuid"

const AddProduct = ()=>{
const [images, setImages] = useState([])
const [variants, setVariants] = useState([{ id:uuid(), size: "", price: "", quantity: "" }])
    return(
        <>
        <AddEditForm images={images} setImages={setImages} variants={variants} setVariants={setVariants} />
        </>
    )

}

export default AddProduct