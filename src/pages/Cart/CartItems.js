import { Fragment, useContext } from "react";
import CartContext from "../../components/store/cart-context";
import classes from './CartItems.module.css';
import { v4 as uuidv4 } from "uuid";

const CartItems = () => {

    const cartCtx = useContext(CartContext);

    // const totalAmount = cartCtx.totalAmount.toFixed(2);

    const cartItemRemoveWholeHandler = id => {
        cartCtx.removeWholeItem(id);
    }

    const cartItemRemoveHandler = (id, isByWeight) => {
        cartCtx.removeItem(id, isByWeight);
    }

    const cartItemAddHandler = item => {
        cartCtx.addOneItem(item);
    }

    const cart_items = cartCtx.items.map((item) => {
        const sum = item.amount * item.price;

        if(item.isByWeight === false){
            return <tr key={uuidv4()}>
                <td className={classes.img_name}>
                    <img src={item.url}></img>
                    {item.name}
                </td>
                <td className={classes.price}>
                    {item.price.toFixed(2) + " zł"}
                </td>
                <td className={classes.amount}>
                    <button className={classes.remove} onClick={cartItemRemoveHandler.bind(null, item.id, item.isByWeight)}></button>
                    {item.amount.toFixed(0) + " szt"}
                    <button className={classes.add} onClick={cartItemAddHandler.bind(null, item)}></button>
                </td>
                <td className={classes.sum}>
                    {sum.toFixed(2) + ' zł'}
                </td>
                <td>
                    <button className={classes.remove_all} onClick={cartItemRemoveWholeHandler.bind(null, item.id)}></button>
                </td>
            </tr>
        } else {
            return <tr key={uuidv4()}>
                <td className={classes.img_name}>
                    <img src={item.url}></img>
                    {item.name}
                </td>
                <td className={classes.price}>
                    {item.price.toFixed(2) + " zł"}
                </td>
                <td className={classes.amount}>
                    <button className={classes.remove} onClick={cartItemRemoveHandler.bind(null, item.id, item.isByWeight)}></button>
                    {item.amount.toFixed(2) + " kg"}
                    <button className={classes.add} onClick={cartItemAddHandler.bind(null, item)}></button>
                </td>
                <td className={classes.sum}>
                    {sum.toFixed(2) + ' zł'}
                </td>
                <td>
                    <button className={classes.remove_all} onClick={cartItemRemoveWholeHandler.bind(null, item.id)}></button>
                </td>
            </tr>
        }
    });

    return <Fragment>
        <tr>
            <th>Produkt</th>
            <th>Cena</th>
            <th>Ilość</th>
            <th>Suma</th>
            <th></th>
        </tr>
        {cart_items}
    </Fragment>
};

export default CartItems;