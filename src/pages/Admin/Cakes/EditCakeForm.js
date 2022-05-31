import { useRef } from "react";
import classes from './CakeForm.module.css';

function EditCakeForm(props) {
  const cakeNameInput = useRef();
  const cakeColorInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCakeName = cakeNameInput.current.value;
    const enteredCakeColor = cakeColorInput.current.value;

    props.onEditCake({
      cakeId: props.cake.cakeId,
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
        <div className={classes.glazeName}>
          <label htmlFor='cakeName'>Rodzaj ciasta</label>
          <input type='text' id='cakeName' ref={cakeNameInput} defaultValue={props.cake.cakeName}/>
        </div>
        <div className={classes.glazeName}>
          <label htmlFor='cakeColor'>Kolor ciasta</label>
          <input className={classes.input} type='text' id='cakeColor' ref={cakeColorInput} defaultValue={props.cake.cakeColor}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditCakeForm;