import React from 'react'
import classes from './Slider.module.css'
import leftArrow from './icons/left.svg'
import rightArrow from './icons/right.svg'

export default function BtnSlider({direction, moveSlide}) {
  return (
    <button onClick={moveSlide} className={direction === "next" ? classes.btn_slide_next : classes.btn_slide_prev}>
        <img alt="" src={direction === "next" ? rightArrow : leftArrow}/>
    </button>
  )
}
