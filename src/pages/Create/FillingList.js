import classes from './CreatePage.module.css';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const FillingList = props => {
    // console.log(props.items);
    let data;
    const [filling, setFilling] = useState("");

    if(props.items) {
        data = props.items.map(item => (
            <label key={item.fillingId}>{item.fillingName}
                <input type="radio" name="filling" defaultChecked onChange={val => setFilling(val.target.value)}/>
                <span className={classes.checkmark}></span>
            </label>
        ));

        const checkedValue = props.items[props.items.length - 1].fillingName;
        if(filling === ""){
            setFilling(props.items[props.items.length - 1].fillingName);
        }

        console.log(filling);
    }
    return <div>{data}</div>;
};

export default FillingList;