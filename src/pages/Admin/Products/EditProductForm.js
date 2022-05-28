import { useRef, Fragment, useState, useCallback, useEffect } from "react";
import API_URL from '../../../utilities/Constants';

function EditProductForm(props) {
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
      console.log(error.message);
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
    const enteredUrl = urlInput.current.value;

    props.onEditProduct({
      productId: props.product.productId,
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
    <Fragment>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='productName'>Nazwa produktu</label>
          <input type='text' id='productName' ref={productNameInput} defaultValue={props.product.name}/>
        </div>
        <div>
          <label htmlFor='description'>Opis</label>
          <input type='text' id='description' ref={descriptionInput} defaultValue={props.product.description} />
        </div>
        <div>
          <label htmlFor='category-select'>Kategoria</label>
          <select name='category' id='category-select' ref={categoryInput} defaultValue={props.product.categoryId}>
            <option value="">--Wybierz kategorię--</option>
            {categories}
          </select>
        </div>
        <div>
          <label htmlFor='isByWeight'>Na wagę?</label>
          <input type='checkbox' id='isByWeight' ref={isByWeightInput} defaultValue={props.product.isByWeight} />
        </div>
        <div>
          <label htmlFor='isCustomizable'>Dostosowywalny?</label>
          <input type='checkbox' id='isCustomizable' ref={isCustomizableInput} defaultValue={props.product.isCustomizable} />
        </div>
        <div>
          <label htmlFor='price'>Cena</label>
          <input type='number' id='price' ref={priceInput} defaultValue={props.product.price} />
        </div>
        <div>
          <label htmlFor='url'>URL zdjęcia</label>
          <input type='text' id='url' ref={urlInput} defaultValue={props.product.imageUrl} />
        </div>
        <button type='submit'>Dodaj</button>
        <button type='button' onClick={onCancelHandler}>Anuluj</button>
      </form>
    </Fragment>
  );
}

export default EditProductForm;