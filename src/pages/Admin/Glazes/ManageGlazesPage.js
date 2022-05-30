import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddGlazeForm from './AddGlazeForm';
import EditGlazeForm from './EditGlazeForm';
import Glazes from './Glazes';
import classes from './ManageGlazesPage.module.css';

function ManageGlazesPage() {

  const [loadedGlazes, setLoadedGlazes] = useState([]);
  const [showingAddGlazeForm, setShowingAddGlazeForm] = useState(false);
  const [showingUpdateGlazeForm, setShowingUpdateGlazeForm] = useState(null);
  const [currentGlaze, setCurrentGlaze] = useState(null);

  const fetchGlazesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/customization/glazes/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać polew.');
      }

      const responseData = await response.json();

      setLoadedGlazes(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchGlazesHandler();
  }, [fetchGlazesHandler]);

  function onClickAddGlaze() {
    setShowingAddGlazeForm(true);
  }

  function onEditHandler(glaze) { 
    setCurrentGlaze(glaze);
    setShowingUpdateGlazeForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć tę polewę? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteGlazeHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchGlazesHandler();
  }

  async function onAddGlaze(glaze) {
    try {
      await addGlazeHandler(glaze);
    } catch (error) {
      alert(error.message);
    }
    
    setShowingUpdateGlazeForm(false);
    fetchGlazesHandler();
  }

  async function onEditGlaze(glaze) {
    try {
      await editGlazeHandler(glaze);
    } catch (error) {
      alert(error.message);
    }
    setShowingUpdateGlazeForm(false);
    fetchGlazesHandler();
  }

  async function addGlazeHandler(glaze) {
    const response = await fetch(`${API_URL}/customization/glazes/add`, {
      method: 'POST',
      body: JSON.stringify(glaze),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać polewy.');
    }
  }

  async function editGlazeHandler(glaze) {
    const response = await fetch(`${API_URL}/customization/glazes/update`, {
      method: 'PUT',
      body: JSON.stringify(glaze),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować polewy.');
    }
  }

  async function deleteGlazeHandler(id) {
    const response = await fetch(`${API_URL}/customization/glazes/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć kategorii.');
    }
  }

  function onCancelHandler() {
    setShowingAddGlazeForm(false);
    setShowingUpdateGlazeForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Polewy</p>
        {!showingAddGlazeForm && !showingUpdateGlazeForm && (<button className={classes.button} type='button' onClick={onClickAddGlaze}>Dodaj</button>)}
      </div>
        {!showingAddGlazeForm && !showingUpdateGlazeForm && <Glazes onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedGlazes={loadedGlazes}/>}
        {showingAddGlazeForm && <AddGlazeForm onAddGlaze={onAddGlaze} onCancelHandler={onCancelHandler}/>}
        {showingUpdateGlazeForm && <EditGlazeForm onEditGlaze={onEditGlaze} onCancelHandler={onCancelHandler} glaze={currentGlaze}/>}
    </div>
  );
}

export default ManageGlazesPage;