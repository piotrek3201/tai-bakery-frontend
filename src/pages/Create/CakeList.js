import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from 'react';

const CakeList = props => {
    let cakes;

    const cakeInput = useRef();

    const changeHandler = event => {
        event.preventDefault();
        const enteredCakeId = cakeInput.current.value;
        props.onChangeHandler(enteredCakeId);
        // console.log(enteredCakeId);
    };


    if(props.items) {
        cakes = props.items.map(item => (
            <option key={item.cakeId} value={item.cakeId}>{item.cakeName}</option> 
        ));
    }

    return <div>
        <form >
            <select name='cake' id='cake-select'  onChange={changeHandler} ref={cakeInput}>
                <option value="" >--Wybierz ciasto--</option>
                {cakes}
            </select>
        </form>
    </div>;
};

export default CakeList;