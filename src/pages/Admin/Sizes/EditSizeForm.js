import { useRef } from "react";
import classes from './SizeForm.module.css';

function EditSizeForm(props) {
  const sizeInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredSize = sizeInput.current.value;

    props.onEditSize({
      sizeId: props.size.sizeId,
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
          <input type='number' id='size' ref={sizeInput} defaultValue={props.size.diameter}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditSizeForm;