import { useEffect } from 'react'
import { Switch, Link, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

import useHttp from '../../../hooks/use-http';

import { deleteCategory, getAllCategories } from '../../../lib/api';
import EditCategory from './EditCategory';
import NewCategory from './NewCategory';

function ManageCategoriesPage() {
  const match = useRouteMatch();
  const history = useHistory();

  const {
    sendRequest,
    status,
    data: loadedCategories,
    error
  } = useHttp(getAllCategories, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let categoryList;
  if (loadedCategories !== null)
  {
    categoryList = loadedCategories.map(category => (
      <li key={category.categoryId}>
        {category.categoryName} <Link to={`${match.path}/edit/${category.categoryId}`}>Edytuj</Link> 
        <button onClick={() => onDeleteHandler(category.categoryId)}>Usuń</button>
      </li>
    ));
  }

  function onDeleteHandler(categoryId) {
    //WYWALA ALE DZIALA
    deleteCategory(categoryId);
    history.go(0);
  }

  if(status !== 'pending' && error){ //dalem tak zeby nie bylo warninga
    return <p>{error}</p>;
  }


  return (
    <div>
      <Switch>
        <Route path={`${match.path}`} exact>
          <p>Kategorie produktów</p>
          <ul>
            {categoryList}
          </ul>
          <Link to={`${match.path}/add`}>Dodaj</Link>
        </Route>
        <Route path={`${match.path}/add`}>
          <NewCategory />
        </Route>
        <Route path={`${match.path}/edit/:categoryId`}>
          <EditCategory />
        </Route>
      </Switch>
    </div>
  );
}

export default ManageCategoriesPage;