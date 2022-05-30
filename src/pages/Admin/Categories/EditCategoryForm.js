import { useRef, Fragment } from "react";
import classes from './CategoryForm.module.css';

function EditCategoryForm(props) {
  const categoryNameInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCategoryName = categoryNameInput.current.value;

    props.onEditCategory({
      categoryId: props.category.categoryId,
      categoryName: enteredCategoryName
    });

    onCancelHandler();
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }
  
  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.categoryName}>
          <label htmlFor='categoryName'>Nazwa kategorii</label>
          <input type='text' id='categoryName' ref={categoryNameInput} defaultValue={props.category.categoryName}/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Zapisz</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default EditCategoryForm;