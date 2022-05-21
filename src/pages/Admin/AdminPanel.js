import { Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function AdminPanel() {
  const match = useRouteMatch();

  return (
    <Fragment>
      <Link to={`${match.path}/categories`}>Kategorie</Link><br />
      <Link to={`${match.path}/products`}>Produkty</Link><br />
      <Link to={`${match.path}/orders`}>Zamówienia</Link><br />
      <Link to={`${match.path}/sizes`}>Rozmiary tortów</Link><br />
      <Link to={`${match.path}/cakes`}>Rodzaje ciast</Link><br />
      <Link to={`${match.path}/fillings`}>Nadzienia</Link><br />
      <Link to={`${match.path}/glazes`}>Polewy</Link><br />
      <Link to={`${match.path}/additions`}>Dodatki</Link><br />
    </Fragment>
  );
}

export default AdminPanel;