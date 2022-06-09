import { useState, Fragment } from "react";
import { SliderData } from "./SliderData";
import classes from './Slider.module.css';
import BtnSlider from "./BtnSlider";
import { v4 as uuidv4 } from "uuid";

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if(slideIndex !== SliderData.length){
            setSlideIndex(slideIndex + 1);
        }
        else {
            setSlideIndex(1);
        }

        clearTimeout(time);
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

    const time = setTimeout(nextSlide, 6000);

    return <Fragment>
        <div className={classes.container_slider}>
            {SliderData.map((obj, index) => {
                return (
                    <div key={obj.id} className={slideIndex === index + 1 ? classes.active_anim : classes.slide}>
                        <img src={obj.image} />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            <div className={classes.container_dots}>
                {Array.from({length: SliderData.length}).map((item, index) => (
                    <div key={uuidv4()} onClick={() => moveDot(index + 1)} className={slideIndex === index + 1 ? classes.dot_active : classes.dot}></div>
                ))}
            </div>
        </div>
        <p>COŚ TU KIEDYŚ BĘDZIE</p>
        
    </Fragment>
};

export default Slider;