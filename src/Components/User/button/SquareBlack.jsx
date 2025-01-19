

const SquareBlack = ({btnName,clickEvent})=>{
    return (
        <button className="bg-black rounded-lg text-white px-10 py-3 ml-3 text-sm" onClick={clickEvent}>{btnName}</button>
    )

}

export default SquareBlack;