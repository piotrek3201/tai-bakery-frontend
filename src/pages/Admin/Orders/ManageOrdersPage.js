import { useEffect, useState, useCallback } from 'react'

import API_URL from '../../../utilities/Constants';
import Orders from './Orders';

//import classes from './ManageOrdersPage.module.css';

function ManageOrdersPage() {
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchGlazesHandler = useCallback(async () => {
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
    fetchGlazesHandler();
  }, [fetchGlazesHandler]);

  

  return (
    <div>
      <div >
        <p>Zamówienia</p>
        
      </div>
        <Orders loadedOrders={loadedOrders} />
    </div>
  );
}

export default ManageOrdersPage;