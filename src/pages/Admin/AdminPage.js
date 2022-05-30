import { Route, Switch, useRouteMatch} from 'react-router-dom';
import { Fragment } from 'react';

import ManageCategoriesPage from './Categories/ManageCategoriesPage';
import AdminPanel from './AdminPanel';
import NotFoundPage from '../../pages/NotFoundPage';
import ManageProductsPage from './Products/ManageProductsPage';
import classes from './AdminPage.module.css';
import ManageGlazesPage from './Glazes/ManageGlazesPage';
import ManageOrdersPage from './Orders/ManageOrdersPage';
import OrderDetailsPage from './Orders/OrderDetailsPage';

function AdminPage() {
  const match = useRouteMatch();

  return (
    <Fragment>
      <p className={classes.page_title}>Panel administratora</p>
      <AdminPanel>
        <Switch>
            <Route path={`${match.path}`} exact>
              Panel
            </Route>
            <Route path={`${match.path}/categories`}>
              <ManageCategoriesPage />
            </Route>
            <Route path={`${match.path}/products`}>
              <ManageProductsPage />
            </Route>
            <Route path={`${match.path}/orders/:orderId`}>
              <OrderDetailsPage />
            </Route>
            <Route path={`${match.path}/orders`} exact>
              <ManageOrdersPage />
            </Route>
            <Route path={`${match.path}/glazes`}>
              <ManageGlazesPage />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
        </Switch>
      </AdminPanel>
    </Fragment>
  );
}

export default AdminPage;