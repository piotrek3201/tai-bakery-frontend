import { useEffect, useState, useCallback } from 'react'
import { useParams } from "react-router-dom";

import API_URL from '../../../utilities/Constants';

function OrderDetailsPage() {
  const params = useParams();

  const { orderId } = params;

  const [loadedOrder, setLoadedOrder] = useState([]);

  const fetchOrderHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać szczegółów zamówienia.');
      }

      const responseData = await response.json();

      setLoadedOrder(responseData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchOrderHandler();
  }, [fetchOrderHandler]);

  const date = new Date(loadedOrder.date);
  const deliveryDate = new Date(loadedOrder.deliveryDate);
  console.log(loadedOrder);

  let orderDetails;
  let i = 0;
  if(loadedOrder.orderDetails != null) {
    orderDetails = loadedOrder.orderDetails.map(detail => {
      i++;

      let customization = "";
      if(detail.product.isCustomizable) {
        const cust = detail.customization;
        customization = 
        `Średnica ${cust.size.diameter} cm,
        ciasto ${cust.cake.cakeName}, 
        nadzienie ${cust.filling.fillingName},
        polewa ${cust.glaze.glazeName},
        dodatki: ${cust.addition.additionName},
        napis: "${cust.text}"`;
      }

      return (
      <tr key={i}>
        <td>{i}</td>
        <td>{detail.product.name}</td>
        <td>{detail.quantity}</td>
        <td>{detail.price} zł</td>
        <td>
          {customization}
        </td>
      </tr>
    )});
  }

  return (
    <div>
      <p>Zamówienie nr: {loadedOrder.orderId}</p>
      <p>
        Klient: {loadedOrder.customerName}<br/>
        E-mail: {loadedOrder.customerEmail}<br/>
        Nr tel.: {loadedOrder.customerPhone}<br/>
        Adres: {loadedOrder.customerAddress}, {loadedOrder.customerPostalCode} {loadedOrder.customerCity}<br/>
        Data złożenia zamówienia: {date.toLocaleDateString()}<br/>
        Planowana data dostawy: {deliveryDate.toLocaleDateString()}<br/>
        Status zamówienia: {loadedOrder.isFinished ? "Ukończone" : "W przygotowaniu"}
      </p>

      Szczegóły zamówienia
      <table>
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Produkt</th>
            <th>Ilość</th>
            <th>Cena</th>
            <th>Szczegóły</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails}
        </tbody>
      </table>

      Wartość zamówienia: {loadedOrder.orderValue} zł
    </div>
    
  );
}

export default OrderDetailsPage;