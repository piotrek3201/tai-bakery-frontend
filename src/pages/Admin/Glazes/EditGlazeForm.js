import { useRef, Fragment } from "react";
import classes from './GlazeForm.module.css';

function EditGlazeForm(props) {
  const glazeNameInput = useRef();
  const glazeColorInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredGlazeName = glazeNameInput.current.value;
    const enteredGlazeColor = glazeColorInput.current.value;

    props.onEditGlaze({
      glazeId: props.glaze.glazeId,
      glazeName: enteredGlazeName,
      glazeColor: enteredGlazeColor
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
          <label htmlFor='glazeName'>Rodzaj polewy</label>
          <input type='text' id='glazeName' ref={glazeNameInput} defaultValue={props.glaze.glazeName}/>
        </div>
        <div className={classes.glazeName}>
          <label htmlFor='glazeColor'>Kolor polewy</label>
          <input className={classes.input} type='text' id='glazeColor' ref={glazeColorInput} defaultValue={props.glaze.glazeColor}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditGlazeForm;