import React, {Fragment, useContext} from 'react';
import classes from './MainNavigation.module.css';
import CartContext from '../store/cart-context';
import { v4 as uuidv4 } from "uuid";

const ShoppingCart = () => {

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const cartItemRemoveWholeHandler = id => {
        cartCtx.removeWholeItem(id);
    }

    const cartItemRemoveHandler = (id, isByWeight) => {
        cartCtx.removeItem(id, isByWeight);
    }

    const cartItemAddHandler = item => {
        cartCtx.addOneItem(item);
    }

    // <li>{item.name + " " + item.amount}</li>

    const cart_items = cartCtx.items.map((item) => {

        const price = item.amount * item.price;

        if(item.isByWeight === false){
            return <div key={uuidv4()} className={classes.cart_items_container}>
                <div className={classes.image_box}>
                    <img src={item.url}></img>
                </div>
                <div className={classes.about}>
                    <h1>{item.name}</h1>
                    <div className={classes.amount}>
                        <h3>{item.amount + " szt"}</h3>
                        <button className={classes.add} onClick={cartItemAddHandler.bind(null, item)}></button>
                        <button className={classes.remove} onClick={cartItemRemoveHandler.bind(null, item.id, item.isByWeight)}></button>
                    </div>
                    <h2>{price.toFixed(2) + " zł"}</h2>
                </div>
                <div className={classes.btn}>
                    <button className={classes.remove_all} onClick={cartItemRemoveWholeHandler.bind(null, item.id)}></button>
                </div>    
            </div>; 
        } else {
            return <div key={uuidv4()} className={classes.cart_items_container}>
            <div className={classes.image_box}>
                <img src={item.url}></img>
            </div>
            <div className={classes.about}>
                <h1>{item.name}</h1>
                <div className={classes.amount}>
                    <h3>{item.amount.toFixed(2) + " kg"}</h3>
                    <button className={classes.add} onClick={cartItemAddHandler.bind(null, item)}></button>
                        <button className={classes.remove} onClick={cartItemRemoveHandler.bind(null, item.id, item.isByWeight)}></button>
                </div>
                <h2>{price.toFixed(2) + " zł"}</h2>
            </div>
            <div className={classes.btn}>
                <button className={classes.remove_all} onClick={cartItemRemoveWholeHandler.bind(null, item.id)}></button>
            </div>    
        </div>; 
        }
    })
    return <Fragment>
      <div className={classes.cart}>
        <div className={classes.title}>
            <h1>Koszyk</h1>
        </div>
        {cart_items}
        <div>
            <div className={classes.total}>
                <h2>Suma</h2>
                <h3>{totalAmount + " zł"}</h3>
            </div>
            <hr />
        </div>
        <button className={classes.button}>Zamów</button>
      </div>
    </Fragment>
}

export default ShoppingCart;