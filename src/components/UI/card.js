import classes from './card.module.css';
import { useState } from 'react';

const Card = props => {

  const [enteredAmount, setEnteredAmount] = useState("1"); 

  const changeHandler = event => {
    setEnteredAmount(event.target.value);
  };

  return (
    <div className={classes.card}>
      <img className={classes.card_img} src={props.url}/>
      <div className={classes.card_body}>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.description}>{props.description}</p>
        {props.isByWeight !== true && <h3 className={classes.price}>{props.price  + " zł/szt"}</h3>}
        {props.isByWeight === true && <h3 className={classes.price}>{props.price  + " zł/kg"}</h3>}
        <div className={classes.container}>
          <button className={classes.btn}>Dodaj do koszyka</button>
          {props.isByWeight === true && <input onChange={changeHandler} className={classes.input} value={enteredAmount/10} type='number' min="0.1" max="5" step="0.1"/>}
          {props.isByWeight !== true && <input onChange={changeHandler} className={classes.input} value={enteredAmount} type='number' min="1" max="5" step="1"/>}
        </div>
      </div>
    </div>
  );
}

export default Card;