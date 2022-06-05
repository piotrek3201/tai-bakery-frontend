import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddFillingForm from './AddFillingForm';
import EditFillingForm from './EditFillingForm';
import Fillings from './Fillings';
import classes from './ManageFillingsPage.module.css';

function ManageFillingsPage() {

  const [loadedFillings, setLoadedFillings] = useState([]);
  const [showingAddFillingForm, setShowingAddFillingForm] = useState(false);
  const [showingUpdateFillingForm, setShowingUpdateFillingForm] = useState(null);
  const [currentFilling, setCurrentFilling] = useState(null);

  const fetchFillingsHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/customization/fillings/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać nadzień.');
      }

      const responseData = await response.json();

      setLoadedFillings(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchFillingsHandler();
  }, [fetchFillingsHandler]);

  function onClickAddFilling() {
    setShowingAddFillingForm(true);
  }

  function onEditHandler(cake) { 
    setCurrentFilling(cake);
    setShowingUpdateFillingForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć to nadzienie? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteFillingHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchFillingsHandler();
  }

  async function onAddFilling(filling) {
    try {
      await addFillingHandler(filling);
    } catch (error) {
      alert(error.message);
    }
    
    setShowingUpdateFillingForm(false);
    fetchFillingsHandler();
  }

  async function onEditFilling(filling) {
    try {
      await editFillingHandler(filling);
    } catch (error) {
      alert(error.message);
    }
    setShowingUpdateFillingForm(false);
    fetchFillingsHandler();
  }

  async function addFillingHandler(filling) {
    const response = await fetch(`${API_URL}/customization/fillings/add`, {
      method: 'POST',
      body: JSON.stringify(filling),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać nadzienia.');
    }
  }

  async function editFillingHandler(filling) {
    const response = await fetch(`${API_URL}/customization/fillings/update`, {
      method: 'PUT',
      body: JSON.stringify(filling),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować nadzienia.');
    }
  }

  async function deleteFillingHandler(id) {
    const response = await fetch(`${API_URL}/customization/fillings/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć nadzienia.');
    }
  }

  function onCancelHandler() {
    setShowingAddFillingForm(false);
    setShowingUpdateFillingForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Nadzienia</p>
        {!showingAddFillingForm && !showingUpdateFillingForm && (<button className={classes.button} type='button' onClick={onClickAddFilling}>Dodaj</button>)}
      </div>
        {!showingAddFillingForm && !showingUpdateFillingForm && <Fillings onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedFillings={loadedFillings}/>}
        {showingAddFillingForm && <AddFillingForm onAddFilling={onAddFilling} onCancelHandler={onCancelHandler}/>}
        {showingUpdateFillingForm && <EditFillingForm onEditFilling={onEditFilling} onCancelHandler={onCancelHandler} filling={currentFilling}/>}
    </div>
  );
}

export default ManageFillingsPage;