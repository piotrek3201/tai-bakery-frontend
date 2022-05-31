import { useRef } from "react";
import classes from './FillingForm.module.css';

function AddFillingForm(props) {
  const fillingNameInput = useRef();
  const fillingColorInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCakeName = fillingNameInput.current.value;
    const enteredCakeColor = fillingColorInput.current.value;

    props.onAddFilling({
      fillingName: enteredCakeName,
      fillingColor: enteredCakeColor
    });

    onCancelHandler();
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.fillingName}>
          <label htmlFor='fillingName'>Rodzaj nadzienia</label>
          <input className={classes.input} type='text' id='fillingName' ref={fillingNameInput} placeholder="Wpisz nazwę nadzienia..."/>
        </div>
        <div className={classes.fillingName}>
          <label htmlFor='fillingColor'>Kolor nadzienia</label>
          <input className={classes.input} type='text' id='fillingColor' ref={fillingColorInput} placeholder="#FFFFFF"/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default AddFillingForm;