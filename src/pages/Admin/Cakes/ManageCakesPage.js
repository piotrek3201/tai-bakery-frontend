import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddCakeForm from './AddCakeForm';
import EditCakeForm from './EditCakeForm';
import Cakes from './Cakes';
import classes from './ManageCakesPage.module.css';

function ManageCakesPage() {

  const [loadedCakes, setLoadedCakes] = useState([]);
  const [showingAddCakeForm, setShowingAddCakeForm] = useState(false);
  const [showingUpdateCakeForm, setShowingUpdateCakeForm] = useState(null);
  const [currentCake, setCurrentCake] = useState(null);

  const fetchCakesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/customization/cakes/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać ciast.');
      }

      const responseData = await response.json();

      setLoadedCakes(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchCakesHandler();
  }, [fetchCakesHandler]);

  function onClickAddCake() {
    setShowingAddCakeForm(true);
  }

  function onEditHandler(cake) { 
    setCurrentCake(cake);
    setShowingUpdateCakeForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć to ciasto? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteCakeHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchCakesHandler();
  }

  async function onAddCake(cake) {
    try {
      await addCakeHandler(cake);
    } catch (error) {
      alert(error.message);
    }
    
    setShowingUpdateCakeForm(false);
    fetchCakesHandler();
  }

  async function onEditCake(cake) {
    try {
      await editCakeHandler(cake);
    } catch (error) {
      alert(error.message);
    }
    setShowingUpdateCakeForm(false);
    fetchCakesHandler();
  }

  async function addCakeHandler(cake) {
    const response = await fetch(`${API_URL}/customization/cakes/add`, {
      method: 'POST',
      body: JSON.stringify(cake),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać ciasta.');
    }
  }

  async function editCakeHandler(cake) {
    const response = await fetch(`${API_URL}/customization/cakes/update`, {
      method: 'PUT',
      body: JSON.stringify(cake),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować ciasta.');
    }
  }

  async function deleteCakeHandler(id) {
    const response = await fetch(`${API_URL}/customization/cakes/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć ciasta.');
    }
  }

  function onCancelHandler() {
    setShowingAddCakeForm(false);
    setShowingUpdateCakeForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Rodzaje ciast</p>
        {!showingAddCakeForm && !showingUpdateCakeForm && (<button className={classes.button} type='button' onClick={onClickAddCake}>Dodaj</button>)}
      </div>
        {!showingAddCakeForm && !showingUpdateCakeForm && <Cakes onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedCakes={loadedCakes}/>}
        {showingAddCakeForm && <AddCakeForm onAddCake={onAddCake} onCancelHandler={onCancelHandler}/>}
        {showingUpdateCakeForm && <EditCakeForm onEditCake={onEditCake} onCancelHandler={onCancelHandler} cake={currentCake}/>}
    </div>
  );
}

export default ManageCakesPage;