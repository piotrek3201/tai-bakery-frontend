import { useRef } from "react";
import classes from './CakeForm.module.css';

function AddCakeForm(props) {
  const cakeNameInput = useRef();
  const cakeColorInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCakeName = cakeNameInput.current.value;
    const enteredCakeColor = cakeColorInput.current.value;

    props.onAddCake({
      cakeName: enteredCakeName,
      cakeColor: enteredCakeColor
    });

    onCancelHandler();
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.cakeName}>
          <label htmlFor='cakeName'>Rodzaj ciasta</label>
          <input className={classes.input} type='text' id='cakeName' ref={cakeNameInput} placeholder="Wpisz nazwę ciasta..."/>
        </div>
        <div className={classes.cakeName}>
          <label htmlFor='cakeColor'>Kolor ciasta</label>
          <input className={classes.input} type='text' id='cakeColor' ref={cakeColorInput} placeholder="#FFFFFF"/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default AddCakeForm;