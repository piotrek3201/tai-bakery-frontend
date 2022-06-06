import classes from './CartPage.module.css';
import { Fragment, useContext } from 'react';
import CartItems from './CartItems';
import CartContext from "../../components/store/cart-context";
import PersonalDataForm from './PersonalDataForm';

const CartPage = () => {

    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    async function onEnterPersonalData(data) {
        data = {
            ...data,
            orderValue: Number(totalAmount)
        }
        console.log(data);
        console.log(cartCtx.items);
    };

    return <Fragment>
        <div className={classes.container}>
            <div className={classes.item_box}>
                <table className={classes.items}>
                    <tbody>
                        <CartItems/>
                    </tbody>
                </table>
            </div>
            <div className={classes.total_box}>
                <hr />
                <h1>Suma zakupów</h1>
                <h2>{totalAmount + " zł"}</h2>
                <hr />
                <PersonalDataForm onEnterPersonalData={onEnterPersonalData}/>
            </div>
        </div> 
    </Fragment>
};

export default CartPage;