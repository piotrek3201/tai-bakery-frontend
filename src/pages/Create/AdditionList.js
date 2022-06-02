import classes from './CreatePage.module.css';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const AdditionList = props => {
    let data;
    const [addition, setAddition] = useState("");

    if(props.items) {
        data = props.items.map(item => (
            <label key={item.additionId}>{item.additionName}
                <input type="radio" name="addition" value={item.additionName} defaultChecked onChange={val => setAddition(val.target.value)}/>
                <span className={classes.checkmark}></span>
            </label>
        ));

        const checkedValue = props.items[props.items.length - 1].additionName;
        if(addition === ""){
            setAddition(props.items[props.items.length - 1].additionName);
        }

        console.log(addition);
    }

    return <div>{data}</div>;
};

export default AdditionList;