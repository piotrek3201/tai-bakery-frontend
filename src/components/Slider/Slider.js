import { useState, Fragment } from "react";
import { SliderData } from "./SliderData";
import classes from './Slider.module.css';
import BtnSlider from "./BtnSlider";

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if(slideIndex !== SliderData.length){
            setSlideIndex(slideIndex + 1);
        }
        else {
            setSlideIndex(1);
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1);
        }
        else {
            setSlideIndex(SliderData.length);
        }
    }

    const moveDot = index => {
        setSlideIndex(index);
    }

    return <Fragment>
        <div className={classes.container_slider}>
            {SliderData.map((obj, index) => {
                return (
                    <div className={slideIndex === index + 1 ? classes.active_anim : classes.slide}>
                        <img src={obj.image} />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            <div className={classes.container_dots}>
                {Array.from({length: SliderData.length}).map((item, index) => (
                    <div onClick={() => moveDot(index + 1)} className={slideIndex === index + 1 ? classes.dot_active : classes.dot}></div>
                ))}
            </div>
        </div>
        
    </Fragment>
};

export default Slider;