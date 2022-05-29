import { Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import classes from './AdminPanel.module.css';

const AdminPanel = props => {
  const match = useRouteMatch();

  return (
    <Fragment>
      <div className={classes.container}>
        <ul className={classes.admin_list}>
          <li><Link to={`${match.path}/categories`}>Kategorie</Link></li>
          <li><Link to={`${match.path}/products`}>Produkty</Link></li>
          <li><Link to={`${match.path}/orders`}>Zamówienia</Link></li>
          <li><Link to={`${match.path}/sizes`}>Rozmiary tortów</Link></li>
          <li><Link to={`${match.path}/cakes`}>Rodzaje ciast</Link></li>
          <li><Link to={`${match.path}/fillings`}>Nadzienia</Link></li>
          <li><Link to={`${match.path}/glazes`}>Polewy</Link></li>
          <li><Link to={`${match.path}/additions`}>Dodatki</Link></li>
        </ul>
      </div>
      {props.children}
    </Fragment>
  );
}

export default AdminPanel;