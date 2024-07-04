import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const HomeFlexSlider = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className}
                style={{ ...style, display: "block", background: "black", borderRadius: "16px", paddingTop: "" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className}
                style={{ ...style, display: "block", background: "black", paddingTop: "", borderRadius: "16px" }}
                onClick={onClick}
            />
        );
    }
    var settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        initialSlide: 0,
    
    autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
              style={{
                borderRadius: "22px",
              }}
            >
              <ul style={{
                    display:"flex",
                    justifyContent: "center",
                    items:"center",
                    opacity: "0.8",
             }}> {dots} </ul>
            </div>
          ),
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             initialSlide: 2
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    };

    return (
        <div className='flex justify-center mt-8  mb-16'>
            <div className='w-11/12 h-[calc(100vh-200px)] mb-16 '>
                <Slider className="slider-container h-h-[calc(100vh-200px)] rounded-lg" {...settings}>
                <div className='relative h-[calc(100vh-200px)] w-full flex items-center justify-center'>
                        <img className='relative  w-full h-full bg-cover bg-center object-cover rounded-lg' src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Login Background" />
                        <div className='bg-black rounded-lg  position absolute top-0 h-full w-full opacity-20'>
fasdf
                        </div>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20' >
                            <div className="font-['Sevillana'] italic font-bold text-5xl sm:text-5xl md:text-7xl lg:text-9xl text-white text-center tracking-widest">Welcome!</div>
                            <div className='text-center text-white text-xl mt-4'>your gateway to a world of stories and knowledge. Explore, discover, and immerse yourself in books today!</div>
                            <div className='flex justify-center mt-6'>
                                <button className='px-16 py-2 bg-white bg-opacity-50 border border-neutral-100 rounded shadow-xl hover:bg-opacity-80 transition-all duration-500 text-black'>Start Exploring</button>
                            </div>
                        </div>
                    </div>
                    <div className='relative h-[calc(100vh-200px)] w-full flex items-center justify-center'>
                        <img className='  w-full h-full object-cover rounded' src="https://images.pexels.com/photos/159872/book-open-pages-literature-159872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Background" />
                        {/* <KeralaSlider/> */}
                    </div>
                    <div className=' h-[calc(100vh-200px)] w-full flex items-center justify-center'>
                        <img className='  w-full h-full bg-cover bg-center object-cover rounded-lg ' src="https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Login Background" />
                        {/* <TajMahal/> */}
                    </div>
                    <div className=' h-[calc(100vh-200px)] w-full flex items-center justify-center'>
                        <img className='  w-full h-full bg-cover bg-center object-cover rounded-lg' src="https://images.pexels.com/photos/990432/pexels-photo-990432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Login Background" />
                        {/* <Delhi/> */}
                        
                    </div>
                    
                    
                   
                </Slider>
            </div>
        </div>
    );
};

export default HomeFlexSlider;
