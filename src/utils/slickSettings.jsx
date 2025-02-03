
const settings = {
    speed: 400,
    slidesToShow: 5,
    infinite: false, // Number of items to show at a time
    slidesToScroll: 1,
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

  export const settingsForProductView ={
    speed: 400,
    slidesToShow: 1,
    infinite: false, // Number of items to show at a time
    slidesToScroll: 1,
    dots:true

  }


  export default settings