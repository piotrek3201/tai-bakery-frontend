import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from 'react';

const SizeList = props => {
    let sizes;

    const sizeInput = useRef();

    const changeHandler = event => {
        event.preventDefault();
        const enteredSizeId = sizeInput.current.value;
        props.onChangeHandler(enteredSizeId);
        // console.log(enteredsizesId);
    };

    if(props.items) {
        sizes = props.items.map(item => (
            <option key={item.sizeId} value={item.sizeId}>{item.diameter}</option> 
        ));
    }

    return <div>
        <form >
            <select name='sizes' id='sizes-select'  onChange={changeHandler} ref={sizeInput}>
                <option value="" >--Wybierz rozmiar--</option>
                {sizes}
            </select>
        </form>
    </div>;
};

export default SizeList;