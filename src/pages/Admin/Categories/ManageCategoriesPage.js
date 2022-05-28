import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';

function ManageCategoriesPage() {

  const [loadedCategories, setLoadedCategories] = useState([]);
  const [showingAddCategoryForm, setShowingAddCategoryForm] = useState(false);
  const [showingUpdateCategoryForm, setShowingUpdateAddCategoryForm] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  let categoryList;

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

  console.log(loadedCategories);

  function onClickAddCategory() {
    setShowingAddCategoryForm(true);
  }

  function onEditHandler(category) { 
    setCurrentCategory(category);
    setShowingUpdateAddCategoryForm(true);
  }

  function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można cofnąć."))
      return;
    try {
      deleteCategoryHandler(id);
    } catch (error) {
      console.log(error.message);
    }
    fetchCategoriesHandler();
  }

  function onAddCategory(category) {
    console.log(category);
    try {
      addCategoryHandler(category);
    } catch (error) {
      console.log(error.message);
    }
    
    setShowingAddCategoryForm(false);
    fetchCategoriesHandler();
  }

  function onEditCategory(category) {
    try {
      editCategoryHandler(category);
    } catch (error) {
      console.log(error.message);
    }
    setShowingUpdateAddCategoryForm(false);
    fetchCategoriesHandler();
  }

  async function addCategoryHandler(category) {
    const response = await fetch(`${API_URL}/categories/add`, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać kategorii.');
    }
  }

  async function editCategoryHandler(category) {
    const response = await fetch(`${API_URL}/categories/update`, {
      method: 'PUT',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować kategorii.');
    }
  }

  async function deleteCategoryHandler(id) {
    const response = await fetch(`${API_URL}/categories/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć kategorii.');
    }
  }

  if (loadedCategories !== null) {
    categoryList = loadedCategories.map(category => (
      <tr key={category.categoryId}>
        <td>
          {category.categoryId}
        </td>
        <td>
        {category.categoryName} 
        </td>
        <td>
          <button onClick={() => onEditHandler(category)}>Edytuj</button>
        </td>
        <td>
          <button onClick={() => onDeleteHandler(category.categoryId)}>Usuń</button>
        </td>
      </tr>
    ));

    categoryList = (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa kategorii</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoryList}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <p>Kategorie produktów</p>
        {!showingAddCategoryForm && !showingUpdateCategoryForm && (<button type='button' onClick={onClickAddCategory}>Dodaj</button>)}
        
        {!showingAddCategoryForm && !showingUpdateCategoryForm && categoryList}
        {showingAddCategoryForm && <AddCategoryForm onAddCategory={onAddCategory}/>}
        {showingUpdateCategoryForm && <EditCategoryForm onEditCategory={onEditCategory} category={currentCategory}/>}
    </div>
  );
}

export default ManageCategoriesPage;