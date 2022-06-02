import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const GlazeList = props => {
    // console.log(props.items);
    let data;
    const [glaze, setGlaze] = useState("");

    if(props.items) {
        data = props.items.map(item => (
            <label key={item.glazeId}>{item.glazeName}
                <input type="radio" name="glaze" defaultChecked onChange={val => setGlaze(val.target.value)}/>
                <span className={classes.checkmark}></span>
            </label>
        ));

        const checkedValue = props.items[props.items.length - 1].glazeName;
        if(glaze === ""){
            setGlaze(props.items[props.items.length - 1].glazeName);
        }

        console.log(glaze);
    }
    return <div>{data}</div>;
};

export default GlazeList;