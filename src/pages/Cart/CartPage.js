import classes from './CartPage.module.css';
import { Fragment, useContext } from 'react';
import CartItems from './CartItems';
import CartContext from "../../components/store/cart-context";

const CartPage = () => {

    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    return <Fragment>
        <div className={classes.container}>
            <div className={classes.item_box}>
                <table className={classes.items}>
                    <CartItems/>
                </table>
            </div>
            <div className={classes.total_box}>
                <hr />
                <h1>Suma zakupów</h1>
                <h2>{totalAmount + " zł"}</h2>
                <hr />
                <button className={classes.button}>Przejdź do płatności</button>
            </div>
        </div> 
    </Fragment>
};

export default CartPage;