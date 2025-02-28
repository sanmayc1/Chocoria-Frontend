

const SingleInputField = ({ placeholder, value, handleChange, name,filedType,noLimitWidth }) => {
  return (
    <>
        <input
          className={`p-3 w-full  bg-gray-200 rounded-lg focus:outline-gray-500 transition-all ${noLimitWidth?"":"max-w-xs"}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          type={filedType?filedType:'text'}
      
        />
      
    </>
  );
};

export default SingleInputField;
