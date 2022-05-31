import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddSizeForm from './AddSizeForm';
import EditSizeForm from './EditSizeForm';
import Sizes from './Sizes';
import classes from './ManageSizesPage.module.css';

function ManageSizesPage() {

  const [loadedSizes, setLoadedSizes] = useState([]);
  const [showingAddSizeForm, setShowingAddSizeForm] = useState(false);
  const [showingUpdateSizeForm, setShowingUpdateSizeForm] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);

  const fetchSizesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/customization/sizes/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać rozmiarów.');
      }

      const responseData = await response.json();

      setLoadedSizes(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSizesHandler();
  }, [fetchSizesHandler]);

  function onClickAddSize() {
    setShowingAddSizeForm(true);
  }

  function onEditHandler(size) { 
    setCurrentSize(size);
    setShowingUpdateSizeForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć ten rozmiar? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteSizeHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchSizesHandler();
  }

  async function onAddSize(size) {
    try {
      await addSizeHandler(size);
    } catch (error) {
      alert(error.message);
    }
    
    setShowingUpdateSizeForm(false);
    fetchSizesHandler();
  }

  async function onEditSize(size) {
    try {
      await editSizeHandler(size);
    } catch (error) {
      alert(error.message);
    }
    setShowingUpdateSizeForm(false);
    fetchSizesHandler();
  }

  async function addSizeHandler(size) {
    const response = await fetch(`${API_URL}/customization/sizes/add`, {
      method: 'POST',
      body: JSON.stringify(size),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać rozmiaru.');
    }
  }

  async function editSizeHandler(size) {
    const response = await fetch(`${API_URL}/customization/sizes/update`, {
      method: 'PUT',
      body: JSON.stringify(size),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować rozmiaru.');
    }
  }

  async function deleteSizeHandler(id) {
    const response = await fetch(`${API_URL}/customization/sizes/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć rozmiaru.');
    }
  }

  function onCancelHandler() {
    setShowingAddSizeForm(false);
    setShowingUpdateSizeForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Rozmiary</p>
        {!showingAddSizeForm && !showingUpdateSizeForm && (<button className={classes.button} type='button' onClick={onClickAddSize}>Dodaj</button>)}
      </div>
        {!showingAddSizeForm && !showingUpdateSizeForm && <Sizes onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedSizes={loadedSizes}/>}
        {showingAddSizeForm && <AddSizeForm onAddSize={onAddSize} onCancelHandler={onCancelHandler}/>}
        {showingUpdateSizeForm && <EditSizeForm onEditSize={onEditSize} onCancelHandler={onCancelHandler} size={currentSize}/>}
    </div>
  );
}

export default ManageSizesPage;