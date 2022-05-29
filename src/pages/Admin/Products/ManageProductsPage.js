import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import Products from './Products';
import classes from './ManageProductsPage.module.css';

function ManageProductsPage() {

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [showingAddProductForm, setShowingAddProductForm] = useState(false);
  const [showingUpdateProductForm, setShowingUpdateProductForm] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  let productList;

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/products/all`);
    
      if (!response.ok) {
        throw new Error('Nie udało się pobrać produktów.');
      }

      const responseData = await response.json();

      setLoadedProducts(responseData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  function onClickAddProduct() {
    setShowingAddProductForm(true);
  }

  function onEditHandler(product) { 
    setCurrentProduct(product);
    setShowingUpdateProductForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć ten produkt? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteProductHandler(id);
    } catch (error) {
      console.log(error.message);
    }
    fetchProductsHandler();
  }

  async function onAddProduct(product) {
    try {
      await addProductHandler(product);
    } catch (error) {
      console.log(error.message);
    }
    
    setShowingAddProductForm(false);
    fetchProductsHandler();
  }

  async function onEditProduct(product) {
    console.log(product);
    try {
      await editProductHandler(product);
    } catch (error) {
      console.log(error.message);
    }
    setShowingUpdateProductForm(false);
    fetchProductsHandler();
  }

  async function addProductHandler(product) {
    const response = await fetch(`${API_URL}/products/add`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać produktu.');
    }
  }

  async function editProductHandler(product) {
    const response = await fetch(`${API_URL}/products/update`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować produktu.');
    }
  }

  async function deleteProductHandler(id) {
    const response = await fetch(`${API_URL}/products/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć produktu.');
    }
  }

  function onCancelHandler() {
    setShowingAddProductForm(false);
    setShowingUpdateProductForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Produkty</p>
        {!showingAddProductForm && !showingUpdateProductForm && (<button className={classes.button} type='button' onClick={onClickAddProduct}>Dodaj</button>)}
      </div>
        {!showingAddProductForm && !showingUpdateProductForm && <Products onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedProducts={loadedProducts}/>}
        {showingAddProductForm && <AddProductForm onAddProduct={onAddProduct} onCancelHandler={onCancelHandler}/>}
        {showingUpdateProductForm && <EditProductForm onEditProduct={onEditProduct} onCancelHandler={onCancelHandler} product={currentProduct}/>}
    </div>
  );
}

export default ManageProductsPage;