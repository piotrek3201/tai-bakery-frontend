import { useRef, useState, useCallback, useEffect } from "react";
import API_URL from '../../../utilities/Constants';
import classes from './ProductForm.module.css';

function AddProductForm(props) {
  const [loadedCategories, setLoadedCategories] = useState([]);

  const fetchCategoriesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/categories/all`);
    
      if (!response.ok) {
        throw new Error('Nie udało się pobrać kategorii.');
      }

      const responseData = await response.json();

      setLoadedCategories(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  let categories;
  if(loadedCategories != null) {
    categories = (
      loadedCategories.map(category => (
       <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option> 
      ))
    );
  }

  const productNameInput = useRef();
  const categoryInput = useRef();
  const descriptionInput = useRef();
  const isByWeightInput = useRef();
  const isCustomizableInput = useRef();
  const priceInput = useRef();
  const urlInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredProductName = productNameInput.current.value;
    const enteredCategoryId = categoryInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredIsByWeight = isByWeightInput.current.checked;
    const enteredIsCustomizable = isCustomizableInput.current.checked;
    const enteredPrice = priceInput.current.value;
    let enteredUrl = urlInput.current.value;

    if(enteredUrl === ""){
      enteredUrl = "url";
    }

    props.onAddProduct({
      name: enteredProductName,
      categoryId: enteredCategoryId,
      description: enteredDescription,
      price: enteredPrice,
      isByWeight: enteredIsByWeight,
      isCustomizable: enteredIsCustomizable,
      imageUrl: enteredUrl
    });
  }

  function onCancelHandler() {
    props.onCancelHandler();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div >
          <label htmlFor='productName'>Nazwa produktu</label>
          <input type='text' id='productName' ref={productNameInput} placeholder="Wpisz nazwę produktu..."/>
        </div>
        <div>
          <label htmlFor='description'>Opis</label>
          <textarea type='text' id='description' ref={descriptionInput} placeholder="Wpisz opis..."/>
        </div>
        <div>
          <label htmlFor='category-select'>Kategoria</label>
          <select name='category' id='category-select' ref={categoryInput}>
            <option value="">--Wybierz kategorię--</option>
            {categories}
          </select>
        </div>
        <div>
          <label htmlFor='isByWeight'>Na wagę?</label>
          <input type='checkbox' id='isByWeight' ref={isByWeightInput} />
        </div>
        <div>
          <label htmlFor='isCustomizable'>Dostosowywalny?</label>
          <input type='checkbox' id='isCustomizable' ref={isCustomizableInput} />
        </div>
        <div>
          <label htmlFor='price'>Cena</label>
          <input type='number' id='price' ref={priceInput} placeholder="..." step="0.01"/>
        </div>
        <div>
          <label htmlFor='url'>URL zdjęcia</label>
          <input type='text' id='url' ref={urlInput} placeholder="Wpisz url..."/>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.button} type='submit'>Dodaj</button>
          <button className={classes.button} type='button' onClick={onCancelHandler}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;