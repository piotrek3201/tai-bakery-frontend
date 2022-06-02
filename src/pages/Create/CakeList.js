import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const CakeList = props => {
    // console.log(props.items);
    let data;
    const [cake, setCake] = useState("");

    if(props.items) {
        data = props.items.map(item => (
            <label key={item.cakeId}>{item.cakeName}
                <input type="radio" name="cake" value={item.cakeName} defaultChecked onChange={val => setCake(val.target.value)}/>
                <span className={classes.checkmark}></span>
            </label>
        ));

        const checkedValue = props.items[props.items.length - 1].cakeName;
        if(cake === ""){
            setCake(props.items[props.items.length - 1].cakeName);
        }

        console.log(cake);
    }
    return <div>{data}</div>;
};

export default CakeList;