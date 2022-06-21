import { useRef } from "react";
import classes from './AdditionForm.module.css';

function AddFillingForm(props) {
  const additionNameInput = useRef();
  const additionVisualInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAdditionName = additionNameInput.current.value;
    const enteredAdditionVisual = additionVisualInput.current.value;

    props.onAddAddition({
      additionName: enteredAdditionName,
      additionVisual: enteredAdditionVisual
    });

    onCancelHandler();
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.additionName}>
          <label htmlFor='additionName'>Dodatek</label>
          <input className={classes.input} type='text' id='additionName' ref={additionNameInput} placeholder="Wpisz nazwę dodatku..."/>
        </div>
        <div className={classes.additionName}>
          <label htmlFor='additionVisual'>Ścieżka do zdjęcia</label>
          <input className={classes.input} type='text' id='additionVisual' ref={additionVisualInput} placeholder="/img/cakeAdditions/addition.png"/>
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