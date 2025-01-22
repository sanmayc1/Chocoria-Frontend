import { TextField } from "@mui/material";

const SingleInputField = ({ placeholder, value, handleChange, name }) => {
  return (
    <>
      <div className="flex justify-center">
        {/* <input
          className="p-3 w-full max-w-xs bg-gray-200 rounded-lg focus:outline-gray-500 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          type="text"
        /> */}
        <TextField
        id="outlined-uncontrolled"
        label={placeholder}
        value={value}
        onChange={handleChange}
        fullWidth
        
        
      />
      </div>
    </>
  );
};

export default SingleInputField;
