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
        <h3 className={classes.price}>{props.price  + " zł"}</h3>
        <div className={classes.container}>
          <button className={classes.btn}>Dodaj do koszyka</button>
          <input onChange={changeHandler} className={classes.input} value={enteredAmount} type='number' min="1" max="5" step="1"/>
        </div>
      </div>
    </div>
  );
}

export default Card;