import classes from "./Orders.module.css";

const Orders = props => {
  let orderList;
  if (props.loadedOrders !== null) {
      orderList = props.loadedOrders.map(order => {
        const date = new Date(order.date);
        const deliveryDate = new Date(order.deliveryDate);
        return (
          <tr key={order.orderId}>
            <td>
              {order.orderId}
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
              {order.orderValue} zł
            </td>
            <td>
              {order.isFinished ? "TAK" : "NIE"}
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