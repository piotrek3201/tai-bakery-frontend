import { useRef, Fragment } from "react";
import classes from './CategoryForm.module.css';

function AddCategoryForm(props) {
  const categoryNameInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCategoryName = categoryNameInput.current.value;

    props.onAddCategory({
      categoryName: enteredCategoryName
    });
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.categoryName}>
          <label htmlFor='categoryName'>Nazwa kategorii</label>
          <input className={classes.input} type='text' id='categoryName' ref={categoryNameInput} placeholder="Wpisz nazwę kategorii..."/>
        </div>
        <button className={classes.button} type='submit'>Dodaj</button>
      </form>
    </div>
  );
}

export default AddCategoryForm;