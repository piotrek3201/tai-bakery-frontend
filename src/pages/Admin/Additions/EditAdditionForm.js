import { useRef } from "react";
import classes from './AdditionForm.module.css';

function EditAdditionForm(props) {
  const additionNameInput = useRef();
  const additionVisualInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAdditionName = additionNameInput.current.value;
    const enteredAdditionVisual = additionVisualInput.current.value;

    props.onEditAddition({
      additionId: props.addition.additionId,
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
          <input type='text' id='additionName' ref={additionNameInput} defaultValue={props.addition.additionName}/>
        </div>
        <div className={classes.additionName}>
          <label htmlFor='additionVisual'>Forma (do ustalenia)</label>
          <input className={classes.input} type='text' id='additionVisual' ref={additionVisualInput} defaultValue={props.addition.additionVisual}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditAdditionForm;