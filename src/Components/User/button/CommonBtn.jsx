


const CommonBtn = ({btnName,clickEvent})=>{
    return(
        <button
        type="submit"
        className="w-full max-w-xs h-10 bg-black rounded-full flex items-center justify-center text-white text-sm hover:bg-gray-800 transition-colors py-7"
        onClick={clickEvent}
      >
        {btnName}
      </button>
    )
}
export default CommonBtn