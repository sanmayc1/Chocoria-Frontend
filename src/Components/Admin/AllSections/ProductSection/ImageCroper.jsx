import { useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import { Button } from "@mui/material";
import { v4 as uuid } from "uuid";

const ImageCropper = ({ src, setCroppedImage,onClose,id,setId }) => {
  // const [croppedImage,setCroppedImage]= useState({})
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    
      cropper.getCroppedCanvas().toBlob((blob) => {
        if(id){
          setCroppedImage((prev)=>(
              prev.map((image)=>{
                if(id===image.id){
                  return{id,img:blob}
                }
                return image
              })
          ))
          setId(null)
          onClose()
      }else{
          setCroppedImage((prev)=>([...prev,{id:uuid(),img:blob}]));
          onClose()
      }
        
         // Blob representation of the cropped image
        // You can upload the blob to your server here
      });
    // const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();


    
  };

  return (
    <>
      <Cropper
        src={src} // Provide the image URL or file data
        style={{ height: 400, width: "100%" }}
        // Configuration options
        aspectRatio={1 / 1}
        guides={false}
        ref={cropperRef}
      />

      <div className="p-3 flex justify-center gap-4">
        <Button style={{ backgroundColor: "black" }} variant="contained"
        onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "black" }}
          variant="contained"
          onClick={handleCrop}
        >
          Crop
        </Button>
      </div>
    </>
  );
};

export default ImageCropper;
