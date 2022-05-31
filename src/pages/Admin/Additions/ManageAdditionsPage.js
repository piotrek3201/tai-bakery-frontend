import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import AddAdditionForm from './AddAdditionForm';
import EditAdditionForm from './EditAdditionForm';
import Additions from './Additions';
import classes from './ManageAdditionsPage.module.css';

function ManageAdditionsPage() {

  const [loadedAdditions, setLoadedAdditions] = useState([]);
  const [showingAddAdditionForm, setShowingAddAdditionForm] = useState(false);
  const [showingUpdateAdditionForm, setShowingUpdateAdditionForm] = useState(null);
  const [currentAddition, setCurrentAddition] = useState(null);

  const fetchAdditionsHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/customization/additions/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać dodatków.');
      }

      const responseData = await response.json();

      setLoadedAdditions(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchAdditionsHandler();
  }, [fetchAdditionsHandler]);

  function onClickAddAddition() {
    setShowingAddAdditionForm(true);
  }

  function onEditHandler(cake) { 
    setCurrentAddition(cake);
    setShowingUpdateAdditionForm(true);
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć ten dodatek? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteAdditionHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchAdditionsHandler();
  }

  async function onAddAddition(addition) {
    try {
      await addAdditionHandler(addition);
    } catch (error) {
      alert(error.message);
    }
    
    setShowingUpdateAdditionForm(false);
    fetchAdditionsHandler();
  }

  async function onEditAddition(addition) {
    try {
      await editAdditionHandler(addition);
    } catch (error) {
      alert(error.message);
    }
    setShowingUpdateAdditionForm(false);
    fetchAdditionsHandler();
  }

  async function addAdditionHandler(addition) {
    const response = await fetch(`${API_URL}/customization/additions/add`, {
      method: 'POST',
      body: JSON.stringify(addition),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się dodać dodatku.');
    }
  }

  async function editAdditionHandler(addition) {
    const response = await fetch(`${API_URL}/customization/additions/update`, {
      method: 'PUT',
      body: JSON.stringify(addition),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować dodatku.');
    }
  }

  async function deleteAdditionHandler(id) {
    const response = await fetch(`${API_URL}/customization/additions/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć dodatku.');
    }
  }

  function onCancelHandler() {
    setShowingAddAdditionForm(false);
    setShowingUpdateAdditionForm(false);
  }

  return (
    <div>
      <div className={classes.container}>
        <p>Dodatki</p>
        {!showingAddAdditionForm && !showingUpdateAdditionForm && (<button className={classes.button} type='button' onClick={onClickAddAddition}>Dodaj</button>)}
      </div>
        {!showingAddAdditionForm && !showingUpdateAdditionForm && <Additions onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} loadedAdditions={loadedAdditions}/>}
        {showingAddAdditionForm && <AddAdditionForm onAddAddition={onAddAddition} onCancelHandler={onCancelHandler}/>}
        {showingUpdateAdditionForm && <EditAdditionForm onEditAddition={onEditAddition} onCancelHandler={onCancelHandler} addition={currentAddition}/>}
    </div>
  );
}

export default ManageAdditionsPage;