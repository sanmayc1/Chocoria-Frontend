
const settings = {
    speed: 400,
    slidesToShow: 5,
    infinite: false,
    slidesToScroll: 1,
    useTransform:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, 
        },
      },
      
      {
        breakpoint:  600,
        settings: {
          slidesToShow: 2, 
        },
      },
    ],
  };

  export const settingsForProductView ={
    speed: 400,
    slidesToShow: 1,
    infinite: false,
    slidesToScroll: 1,
    dots:true

  }


  export default settings