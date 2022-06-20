import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Orders.module.css";

const Orders = props => {
  const match = useRouteMatch();

  let orderList;
  if (props.loadedOrders !== null) {
      orderList = props.loadedOrders.map(order => {
        const date = new Date(order.date);
        const deliveryDate = new Date(order.deliveryDate);
        return (
          <tr key={order.orderId}>
            <td>
              <Link to={`${match.path}/${order.orderId}`}>{order.orderId}</Link>
            </td>
            <td>
              {order.customerEmail} 
            </td>
            <td>
              {date.toLocaleDateString()}
            </td>
            <td>
              {deliveryDate.toLocaleDateString()}
            </td>
            <td>
              {order.orderValue.toFixed(2)} zł
            </td>
            <td>
              {order.isFinished ? "TAK" : "NIE"}
            </td>
            <td>
              <button className={classes.button} onClick={() => props.onEditHandler(order)}>Zmień status</button>
            </td>
            <td>
              <button className={classes.button} onClick={() => props.onDeleteHandler(order.orderId)}>Usuń</button>
            </td>
          </tr>
      )});
  
      return orderList = (
        <div className={classes.container}>
          <table className={classes.items}>
            <thead>
              <tr>
                <th>ID</th>
                <th>E-mail</th>
                <th>Data zamówienia</th>
                <th>Data dostawy</th>
                <th>Kwota</th>
                <th>Ukończone?</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderList}
            </tbody>
          </table>
        </div>
        
      );
    }
};

export default Orders;