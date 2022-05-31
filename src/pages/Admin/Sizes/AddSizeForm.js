import { useRef } from "react";
import classes from './SizeForm.module.css';

function AddSizeForm(props) {
  const sizeInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredSize = sizeInput.current.value;

    props.onAddSize({
      diameter: enteredSize
    });

    onCancelHandler();
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.sizeName}>
          <label htmlFor='size'>Średnica tortu (cm)</label>
          <input className={classes.input} type='number' id='size' ref={sizeInput}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default AddSizeForm;