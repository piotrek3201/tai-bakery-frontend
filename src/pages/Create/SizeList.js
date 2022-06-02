import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const SizeList = props => {
    // console.log(props.items);
    let data;
    const [size, setSize] = useState("");

    if(props.items) {
        props.items.sort(function(a, b){return a - b});
        data = props.items.map(item => (
            <label key={item.sizeId}>{item.diameter + " cm"}
                <input type="radio" name="diameter" defaultChecked onChange={val => setSize(val.target.value)}/>
                <span className={classes.checkmark}></span>
            </label>
        ));

        const checkedValue = props.items[props.items.length - 1].diameter;
        if(size === ""){
            setSize(props.items[props.items.length - 1].diameter);
        }

        console.log(size);
    }
    return <div>{data}</div>;
};

export default SizeList;