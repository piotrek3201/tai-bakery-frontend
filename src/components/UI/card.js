import classes from './card.module.css';
import { useState, useContext } from 'react';
import CartContext from '../store/cart-context';
import { Link } from "react-router-dom";

const Card = props => {
  const cartCtx = useContext(CartContext);

  const [enteredAmount, setEnteredAmount] = useState("1");
  const [amountIsValid, setAmountIsValid] = useState(true);

  let val;

  const addItemToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.title,
      amount: amount,
      price: props.price,
      isByWeight: props.isByWeight,
      url: props.url,
      isCustomizable: props.isCustomizable
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmount < 0.1 || enteredAmount > 10){
      setAmountIsValid(false);
      return;
    }

    {addItemToCartHandler(enteredAmountNumber)};
   
  };

  const changeHandler = event => {
    setEnteredAmount(event.target.value);
  };

  if(enteredAmount === 1 && props.isByWeight === true){
    val = enteredAmount/10;
  } else {
    val = enteredAmount;
  }

  return (
    <div className={classes.card}>
      <img className={classes.card_img} src={props.url}/>
      <div className={classes.card_body}>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.description}>{props.description}</p>
        {props.isByWeight !== true && <h3 className={classes.price}>{props.price  + " zł/szt"}</h3>}
        {props.isByWeight === true && <h3 className={classes.price}>{props.price  + " zł/kg"}</h3>}
        <form className={classes.container} onSubmit={submitHandler}>
          {props.isCustomizable !== true && <button className={classes.btn}>Dodaj do koszyka</button>}
          {props.isCustomizable === true && <Link to={`/create/${props.id}/${props.categoryId}`} className={classes.btn_custom}>Dostosuj</Link>}
          {/* {props.isCustomizable === true && <button className={classes.btn}>Customizuj</button>} */}
          {props.isByWeight === true && props.isCustomizable !== true && <input onChange={changeHandler} className={classes.input} value={val} type='number' min="0.1" max="10" step="0.1"/>}
          {props.isByWeight !== true && props.isCustomizable !== true && <input onChange={changeHandler} className={classes.input} value={val} type='number' min="1" max="10" step="1"/>}
        </form>
      </div>
    </div>
  );
}

export default Card;