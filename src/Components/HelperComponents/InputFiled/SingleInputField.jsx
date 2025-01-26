

const SingleInputField = ({ placeholder, value, handleChange, name,filedType }) => {
  return (
    <>
      <div className="flex justify-center">
        <input
          className="p-3 w-full max-w-xs bg-gray-200 rounded-lg focus:outline-gray-500 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          type={filedType?filedType:'text'}
          
        />
      
      </div>
    </>
  );
};

export default SingleInputField;
