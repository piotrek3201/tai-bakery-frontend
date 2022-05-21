import { Route, Switch, useRouteMatch} from 'react-router-dom';
import { Fragment } from 'react';

import ManageCategoriesPage from './Categories/ManageCategoriesPage';
import AdminPanel from './AdminPanel';
import NotFoundPage from '../../pages/NotFoundPage';

function AdminPage() {
  const match = useRouteMatch();

  return (
    <Fragment>
      <p>Panel administratora</p>
      <Switch>
          <Route path={`${match.path}`} exact>
            <AdminPanel />
          </Route>
          <Route path={`${match.path}/categories`}>
            <ManageCategoriesPage />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
      </Switch>
    </Fragment>
  );
}

export default AdminPage;