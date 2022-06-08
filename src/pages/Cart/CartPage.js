import classes from './CartPage.module.css';
import { Fragment, useContext } from 'react';
import CartItems from './CartItems';
import CartContext from "../../components/store/cart-context";
import PersonalDataForm from './PersonalDataForm';
import API_URL from '../../utilities/Constants';

const CartPage = () => {

    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const cartItemRemoveWholeHandler = () => {
        for(let i = 0; i < cartCtx.items.length; i++){
            cartCtx.removeWholeItem(cartCtx.items[i].id);
        }
    }

    async function onEnterPersonalData(data) {

        const preparedItems = cartCtx.items.map((item) => {
            if(item.customization){
                return {
                    productId: item.id,
                    quantity: item.amount,
                    customization: item.customization.slice('sizeId', 'glazeId', 'fillingId', 'cakeId', 'additionId', 'text')
                }
            } else {
                return {
                    productId: item.id,
                    quantity: item.amount
                }
            }
            
        });

        const order = {
            ...data,
            // orderValue: Number(totalAmount),
            orderDetails: preparedItems
        }
        onAddOrder(order);
        // console.log(order);
    };

    async function onAddOrder(order) {
        try {
          await addOrderHandler(order);
          cartItemRemoveWholeHandler();
        } catch (error) {
          alert(error.message);
        }
      }

    async function addOrderHandler(order) {
        console.log(order);
        const response = await fetch(`${API_URL}/orders/add`, {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Nie udało się dodać zamówienia.');
        }
    } 

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