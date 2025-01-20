
const settings = {
    speed: 500,
    slidesToShow: 5.001, // Number of items to show at a time
    slidesToScroll: 1,
    autoplay:false,
    autoplaySpeed:3000,
    pauseOnHover:true,
    swipe:true,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Number of items to show on medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Number of items to show on small screens
        },
      },
      ,
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Number of items to show on small screens
        },
      },
    ],
  };


  export default settings