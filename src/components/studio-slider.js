import React from 'react';
import Slider from 'react-slick';
import { GatsbyImage } from 'gatsby-plugin-image';

const StudioSlider = ({ sliderContent }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        cssEase: "linear"
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {sliderContent.map((slide, index) => (
                    <div key={index}>
                        <GatsbyImage image={slide.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={slide.node.featuredImage.node.title} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default StudioSlider;
