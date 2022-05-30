import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import Orders from './Orders';

//import classes from './ManageOrdersPage.module.css';

function ManageOrdersPage() {
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrdersHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/orders/all`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać zamówień.');
      }

      const responseData = await response.json();

      setLoadedOrders(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchOrdersHandler();
  }, [fetchOrdersHandler]);

  async function onEditHandler(order) {
    if(order.isFinished)
      order.isFinished = false;
    else
      order.isFinished = true;
    try {
      await editOrderHandler(order);
    } catch (error) {
      alert(error.message);
    }
    fetchOrdersHandler();
  }

  async function editOrderHandler(order) {
    const response = await fetch(`${API_URL}/orders/update`, {
      method: 'PUT',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować zamówienia.');
    }
  }

  async function deleteOrderHandler(id) {
    const response = await fetch(`${API_URL}/orders/delete/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Nie udało się usunąć zamówienia.');
    }
  }

  async function onDeleteHandler(id) {
    if (!window.confirm("Czy na pewno chcesz usunąć to zamówienie? Tej operacji nie można cofnąć."))
      return;
    try {
      await deleteOrderHandler(id);
    } catch (error) {
      alert(error.message);
    }
    fetchOrdersHandler();
  }

  return (
    <div>
      <div>
        <p>Zamówienia</p>
      </div>
        <Orders loadedOrders={loadedOrders} onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} />
    </div>
  );
}

export default ManageOrdersPage;