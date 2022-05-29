import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import Categories from './Categories';
import classes from './ManageCategoriesPage.module.css';

function ManageCategoriesPage() {

  const [loadedCategories, setLoadedCategories] = useState([]);
  const [showingAddCategoryForm, setShowingAddCategoryForm] = useState(false);
  const [showingUpdateCategoryForm, setShowingUpdateAddCategoryForm] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  let categoryList;

  const fetchCategoriesHandler = useCallback(async () => {
    console.log("Zasysamy");
    try {
      const response = await fetch(`${API_URL}/categories/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać kategorii.');
      }

      const responseData = await response.json();
      console.log(responseData);
      setLoadedCategories(responseData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  // console.log(loadedCategories);

  function onClickAddCategory() {
    setShowingAddCategoryForm(true);
  }

  function onEditHandler(category) { 
    setCurrentCategory(category);
    setShowingUpdateAddCategoryForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteCategoryHandler(id);
    } catch (error) {
      console.log(error.message);
    }
    fetchCategoriesHandler();
  }

  async function onAddCategory(category) {
    console.log(category);
    try {
      await addCategoryHandler(category);
    } catch (error) {
      console.log(error.message);
    }
    
    setShowingAddCategoryForm(false);
    fetchCategoriesHandler();
  }

  async function onEditCategory(category) {
    try {
      await editCategoryHandler(category);
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

    console.log("dodano");
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

  return (
    <div>
      <div className={classes.container}>
        <p>Kategorie produktów</p>
        {!showingAddCategoryForm && !showingUpdateCategoryForm && (<button className={classes.button} type='button' onClick={onClickAddCategory}>Dodaj</button>)}
      </div>
        {!showingAddCategoryForm && !showingUpdateCategoryForm && <Categories onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedCategories={loadedCategories}/>}
        {showingAddCategoryForm && <AddCategoryForm onAddCategory={onAddCategory}/>}
        {showingUpdateCategoryForm && <EditCategoryForm onEditCategory={onEditCategory} category={currentCategory}/>}
    </div>
  );
}

export default ManageCategoriesPage;