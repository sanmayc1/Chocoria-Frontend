
const settings = {
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    useTransform:false,
    responsive: [
      {
        breakpoint: 1240,
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
        breakpoint:  634,
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

  export const settingsForBrandList = {
    speed: 400,
    slidesToShow: 6,
    infinite: true,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    dots:true,
    responsive: [
      {
        breakpoint: 1240,
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
  }


  export default settings