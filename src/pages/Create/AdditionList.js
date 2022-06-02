import classes from './CreatePage.module.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from "uuid";

const AdditionList = props => {
    let additions;

    const additionInput = useRef();

    const changeHandler = event => {
        event.preventDefault();
        const enteredAdditionId = additionInput.current.value;
        props.onChangeHandler(enteredAdditionId);
        // console.log(enteredAdditionId);
    };

    if(props.items) {
        additions = props.items.map(item => (
            <option key={item.additionId} value={item.additionId}>{item.additionName}</option> 
        ));
    }

    return <div>
        <form >
            <select name='addition' id='addition-select'  onChange={changeHandler} ref={additionInput}>
                <option value="" >--Wybierz dodatek--</option>
                {additions}
            </select>
        </form>
    </div>;
};

export default AdditionList;