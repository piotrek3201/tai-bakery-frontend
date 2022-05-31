import { useRef } from "react";
import classes from './FillingForm.module.css';

function EditFillingForm(props) {
  const fillingNameInput = useRef();
  const fillingColorInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredFillingName = fillingNameInput.current.value;
    const enteredFillingColor = fillingColorInput.current.value;

    props.onEditFilling({
      fillingId: props.filling.fillingId,
      fillingName: enteredFillingName,
      fillingColor: enteredFillingColor
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
          <label htmlFor='fillingName'>Rodzaj ciasta</label>
          <input type='text' id='fillingName' ref={fillingNameInput} defaultValue={props.filling.fillingName}/>
        </div>
        <div className={classes.fillingName}>
          <label htmlFor='fillingColor'>Kolor ciasta</label>
          <input className={classes.input} type='text' id='fillingColor' ref={fillingColorInput} defaultValue={props.filling.fillingColor}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditFillingForm;