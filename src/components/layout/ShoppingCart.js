import React, {Fragment, useContext} from 'react';
import classes from './MainNavigation.module.css';
import CartContext from '../store/cart-context';

const ShoppingCart = () => {

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    // <li>{item.name + " " + item.amount}</li>

    const cart_items = cartCtx.items.map((item) => {

        const price = item.amount * item.price;

        if(item.isByWeight === false){
            return <div className={classes.cart_items_container}>
                <div className={classes.image_box}>
                    <img src={item.url}></img>
                </div>
                <div className={classes.about}>
                    <h1>{item.name}</h1>
                    <h3>{item.amount + " szt"}</h3>
                    <h2>{price.toFixed(2) + " zł"}</h2>
                </div>
                <div className={classes.btn}>
                    <button className={classes.remove_btn} onClick={cartItemRemoveHandler.bind(null, item.id)}></button>
                </div>    
            </div>; 
        } else {
            return <div className={classes.cart_items_container}>
            <div className={classes.image_box}>
                <img src={item.url}></img>
            </div>
            <div className={classes.about}>
                <h1>{item.name}</h1>
                <h3>{item.amount + " kg"}</h3>
                <h2>{price.toFixed(2) + " zł"}</h2>
            </div>
            <div className={classes.btn}>
                <button className={classes.remove_btn} onClick={cartItemRemoveHandler.bind(null, item.id)}></button>
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