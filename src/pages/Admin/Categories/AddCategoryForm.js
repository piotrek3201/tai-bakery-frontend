import { useRef, Fragment } from "react";

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
    <Fragment>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='categoryName'>Nazwa kategorii</label>
          <input type='text' id='categoryName' ref={categoryNameInput} />
        </div>
        <button type='submit'>Dodaj</button>
      </form>
    </Fragment>
  );
}

export default AddCategoryForm;