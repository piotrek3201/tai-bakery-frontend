import classes from './CartPage.module.css';
import { Fragment, useRef, useState } from 'react';

const PersonalDataForm = props => {

    const deliveryInput = useRef();
    const selfPickUpInput = useRef();
    const nameInput = useRef();
    const lastNameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const addressInput = useRef();
    const cityInput = useRef();
    const postcodeInput = useRef();
    const dateInput = useRef();

    const [enteredDelivery, setDelivery] = useState(true);
    const [enteredSelfPickUp, setSelfPickUp] = useState(false);
    const [enteredDate, setDate] = useState("");

    const changeDeliveryHandler = () => {
        console.log("selfInput: " + selfPickUpInput.current.checked);
        console.log("deliveryInput: " + deliveryInput.current.checked);
        console.log("enteredSelf: " + enteredSelfPickUp);
        console.log("enteredDelivery: " + enteredDelivery);

        if(enteredDelivery === true && selfPickUpInput.current.checked === true){
            setSelfPickUp(selfPickUpInput.current.checked);
            setDelivery(false);
            deliveryInput.current.checked = false;
        }

        if(enteredSelfPickUp === true && deliveryInput.current.checked === true){
            setDelivery(deliveryInput.current.checked);
            setSelfPickUp(false);
            selfPickUpInput.current.checked = false;
        }

        if(enteredSelfPickUp === true && selfPickUpInput.current.checked === false && deliveryInput.current.checked === false && enteredDelivery === false){
            selfPickUpInput.current.checked = false;
            setSelfPickUp(false);
            console.log("selfPickUp - false");
            deliveryInput.current.checked = true;
            setDelivery(true);
            console.log("delivery - true");
        }

        if(enteredSelfPickUp === false && selfPickUpInput.current.checked === false && deliveryInput.current.checked === false && enteredDelivery === true){
            selfPickUpInput.current.checked = true;
            setSelfPickUp(true);
            console.log("selfPickUp - false");
            deliveryInput.current.checked = false;
            setDelivery(false);
            console.log("delivery - true");
        }

        // setDelivery(deliveryInput.current.checked);
        // setSelfPickUp(selfPickUpInput.current.checked);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        let enteredName = "string";
        let enteredLastName = "string";
        let enteredAddress = "";
        let enteredPhone = "string";
        let enteredCity = "";
        let enteredPostcode = "";
        let enteredEmail = "string";

        if(enteredDelivery === false){
            enteredName = nameInput.current.value;
            enteredLastName = lastNameInput.current.value;
            enteredPhone = phoneInput.current.value;
            enteredEmail = emailInput.current.value;
        } else {
            enteredName = nameInput.current.value;
            enteredLastName = lastNameInput.current.value;
            enteredPhone = phoneInput.current.value;
            enteredEmail = emailInput.current.value;
            enteredAddress = addressInput.current.value;
            enteredCity = cityInput.current.value;
            enteredPostcode = postcodeInput.current.value;
        }

        props.onEnterPersonalData({
            customerEmail: enteredEmail,
            customerName: enteredName + " " + enteredLastName,
            // customerLastName: enteredLastName,
            customerPhone: enteredPhone,
            customerAddress: enteredAddress,
            customerCity: enteredCity,
            customerPostalCode: enteredPostcode,
            selfPickUp: enteredSelfPickUp,
            deliveryDate: enteredDate
        });

    };

    const deliveryForm = () => {
        return <Fragment>
            <div className={classes.address}>
                <div className={classes.input}>
                    <label>Adres</label>
                    <input type="text" id="address" name="address" ref={addressInput} placeholder="Adres.." required/>
                </div>
            </div>
            <div className={classes.full_address}>
                <div className={classes.input}>
                    <label>Miasto</label>
                    <input type="text" id="city" name="city" ref={cityInput} placeholder="Miasto..." required/>
                </div>
                <div className={classes.input}>
                    <label>Kod pocztowy</label>
                    <input id="postcode" name="postcode" type="text" ref={postcodeInput} pattern="^[0-9]{2}[-][0-9]{3}" placeholder="00-000" required/>
                </div>
            </div>
        </Fragment>
    }
    
    return <form onSubmit={submitHandler}>
        <div className={classes.form}>
            <div className={classes.name}>
                <div className={classes.input}>
                    <label>Imię</label>
                    <input type="text" id="fname" name="firstname" ref={nameInput} placeholder="Imię..." required/>
                </div>
                <div className={classes.input}>
                    <label>Nazwisko</label>
                    <input type="text" id="lname" name="lastname" ref={lastNameInput} placeholder="Nazwisko..." required/>
                </div>
            </div>
            <div className={classes.contact}>
                <div className={classes.input}>
                    <label>Telefon</label>
                    <input type="phone" id="fname" name="firstname" ref={phoneInput} maxLength={9} placeholder="Numer telefonu..." required/>
                </div>
                <div className={classes.input}>
                    <label>Email</label>
                    <input type="email" id="email" name="email" ref={emailInput} placeholder="Email..." required/>
                </div>
            </div>
            <div className={classes.date}>
                <div className={classes.input}>
                    {enteredDelivery === true && <label>Data i godzina dostawy</label>}
                    {enteredDelivery !== true && <label>Data i godzina odbioru</label>}
                    <input type="datetime-local" id="time" name="time" ref={dateInput} onChange={event => {setDate(event.target.value)}} required/>
                </div>
            </div>
            <div className={classes.delivery_type}>
                <div className={classes.input}>
                    <label>Dostawa</label>
                    <input type='checkbox' ref={deliveryInput} id='delivery' defaultChecked={enteredDelivery} onChange={changeDeliveryHandler}/>
                </div>
                <div className={classes.input}>
                    <label>Odbiór osobisty</label>
                    <input type='checkbox' ref={selfPickUpInput} id='pick_up' defaultChecked={enteredSelfPickUp} onChange={changeDeliveryHandler}/>
                </div>
            </div>
            {enteredDelivery === true && deliveryForm()}
            <button className={classes.button} type="submit">Przejdź do płatności</button>
        </div>
    </form>
    
};

export default PersonalDataForm;