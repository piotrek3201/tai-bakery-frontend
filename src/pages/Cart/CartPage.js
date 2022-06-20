import classes from './CartPage.module.css';
import { Fragment, useContext, useState } from 'react';
import CartItems from './CartItems';
import CartContext from "../../components/store/cart-context";
import PersonalDataForm from './PersonalDataForm';
import API_URL from '../../utilities/Constants';
import Payment from './Payment';

const CartPage = () => {

    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const cartItemRemoveWholeHandler = () => {
        for(let i = 0; i < cartCtx.items.length; i++){
            cartCtx.removeWholeItem(cartCtx.items[i].id);
        }
    }

    function onEnterPersonalData(data) {

        setShowPaymentOptions(true);

        const order = {
            ...data,
            orderValue: Number(totalAmount)
        }
        setOrderData(order);
    };

    function onPayHandler() {
        const preparedItems = cartCtx.items.map((item) => {
            
            if(item.customization){
                return {
                    productId: item.id,
                    quantity: item.amount,
                    //customization: item.customization.slice('sizeId', 'glazeId', 'fillingId', 'cakeId', 'additionId', 'text')
                    
                    customization: {
                        additionId: item.customization.additionId,
                        cakeId: item.customization.cakeId,
                        fillingId: item.customization.fillingId,
                        glazeId: item.customization.glazeId,
                        sizeId: item.customization.sizeId,
                        text: item.customization.text
                    }
                }
            } else {
                return {
                    productId: item.id,
                    quantity: item.amount
                }
            }
            
        });
        
        const order = {
            ...orderData,
            orderValue: Number(totalAmount),
            orderDetails: preparedItems
        }
        setOrderData(order);
        console.log(order);

        onAddOrder(order);
        setShowPaymentOptions(false);
        setShowSuccess(true);
        setOrderData(order);
    }

    async function onAddOrder(order) {
        try {
          await addOrderHandler(order);
          await cartItemRemoveWholeHandler();
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

        { !showPaymentOptions && !showSuccess && (
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
                    <h2>{totalAmount.toFixed(2) + " zł"}</h2>
                    <hr />
                    <PersonalDataForm onEnterPersonalData={onEnterPersonalData}/>
                </div>
            </div> 
        )}
        { showPaymentOptions && (
            <Payment onPay={onPayHandler} orderData={orderData}/>
        )}
        { showSuccess && (
            <div className={classes.payment}>
                <p>
                    Zamówienie zostało zrealizowane.
                </p>
            </div>
        )}
    </Fragment>
};

export default CartPage;