import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';

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

  function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć ten produkt? Tej operacji nie można cofnąć."))
      return;
    try {
      deleteProductHandler(id);
    } catch (error) {
      console.log(error.message);
    }
    fetchProductsHandler();
  }

  function onAddProduct(product) {
    try {
      addProductHandler(product);
    } catch (error) {
      console.log(error.message);
    }
    
    setShowingAddProductForm(false);
    fetchProductsHandler();
  }

  function onEditProduct(product) {
    console.log(product);
    try {
      editProductHandler(product);
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

  if (loadedProducts !== null) {
    productList = loadedProducts.map(product => (
      <tr key={product.productId}>
        <td>{product.productId}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.category.categoryName}</td>
        <td>{product.isByWeight ? "TAK" : "NIE"}</td>
        <td>{product.isCustomizable ? "TAK" : "NIE"}</td>
        <td>{product.price}</td>
        <td><img src={product.imageUrl} alt={product.name} width='200' height='200' /></td>
        <td>
          <button onClick={() => onEditHandler(product)}>Edytuj</button>
        </td>
        <td>
          <button onClick={() => onDeleteHandler(product.productId)}>Usuń</button>
        </td>
      </tr>
    ));

    productList = (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa produktu</th>
            <th>Opis</th>
            <th>Kategoria</th>
            <th>Na wagę?</th>
            <th>Dostosowywalny?</th>
            <th>Cena</th>
            <th>Zdjęcie</th>
          </tr>
        </thead>
        <tbody>
          {productList}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <p>Kategorie produktów</p>
        {!showingAddProductForm && !showingUpdateProductForm && (<button type='button' onClick={onClickAddProduct}>Dodaj</button>)}
        
        {!showingAddProductForm && !showingUpdateProductForm && productList}
        {showingAddProductForm && <AddProductForm onAddProduct={onAddProduct} onCancelHandler={onCancelHandler}/>}
        {showingUpdateProductForm && <EditProductForm onEditProduct={onEditProduct} onCancelHandler={onCancelHandler} product={currentProduct}/>}
    </div>
  );
}

export default ManageProductsPage;