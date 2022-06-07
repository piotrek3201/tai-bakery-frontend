import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import { useCallback, useEffect, useState } from "react";
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/Admin/AdminPage';
import CartPage from './pages/Cart/CartPage';
import CreatePage from './pages/Create/CreatePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import API_URL from './utilities/Constants';
import LogoutPage from './pages/LogoutPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories_ = async () => {
          const response = await fetch(`${API_URL}/categories/all`);
          const responseCategories = await response.json();
          setCategories(responseCategories);
      }
      fetchCategories_();
  }, []);

  const [userAccount, setUserAccount] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const fetchUserHandler = useCallback(async () => {
      const response = await fetch(`${API_URL}/auth/user`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }

      setUserAccount(responseData);
    }, []);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler]);

  return (
    <Layout categories={categories} userData={userAccount} isLogged={isLogged}>
      <Switch>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/products' exact>
          <ProductsPage categories={categories}/>
        </Route>
        <Route path='/contact'>
          <ContactPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Route path='/' exact>
          <Redirect to='/home'/>
        </Route>
        <Route path='/products/:categoryId'>
          <ProductsPage categories={categories}/>
        </Route>
        {isLogged && userAccount.role === 1 && (
          <Route path='/admin'>
            <AdminPage />
          </Route>
        )}
        {(!isLogged || userAccount.role !== 1) && (
          <Route path='/admin'>
            <NotAuthorizedPage />
          </Route>
        )}
        <Route path='/cart'>
          <CartPage />
        </Route>
        <Route path='/create/:customCakeId/:categoryId'>
          <CreatePage/>
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/logout'>
          <LogoutPage />
        </Route>
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
