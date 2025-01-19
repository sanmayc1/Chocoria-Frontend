

const Banner = ()=>{
    return (
        <>
        <div className="w-full sm:h-36 h-20 "></div>
        <div
          className="xl:min-h-[400px] lg:max-h-[470px] md:min-h-[320px] md:rounded-[50px]  min-h-48 mx-3 md:mx-10 xl:mx-20 rounded-3xl xl:rounded-[70px] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('trailbanner.webp')" }}
        ></div>
        </>
    )
}

export default Banner