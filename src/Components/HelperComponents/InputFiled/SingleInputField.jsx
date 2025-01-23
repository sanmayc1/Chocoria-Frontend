

const SingleInputField = ({ placeholder, value, handleChange, name }) => {
  return (
    <>
      <div className="flex justify-center">
        <input
          className="p-3 w-full max-w-xs bg-gray-200 rounded-lg focus:outline-gray-500 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          type="text"
        />
      
      </div>
    </>
  );
};

export default SingleInputField;
