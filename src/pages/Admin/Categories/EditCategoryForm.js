import { useRef, Fragment } from "react";

function EditCategoryForm(props) {
  const categoryNameInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCategoryName = categoryNameInput.current.value;

    props.onEditCategory({
      categoryId: props.category.categoryId,
      categoryName: enteredCategoryName
    });
  }
  
  return (
    <Fragment>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='categoryName'>Nazwa kategorii</label>
          <input type='text' id='categoryName' ref={categoryNameInput} defaultValue={props.category.categoryName}/>
        </div>
        <button type='submit'>Zapisz</button>
      </form>
    </Fragment>
  );
}

export default EditCategoryForm;