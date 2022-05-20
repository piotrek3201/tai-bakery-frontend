import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import { useEffect, useState } from 'react';
import Category from './components/layout/Category';
import ContactPage from './pages/ContactPage';

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories_ = async () => {
          const response = await fetch('https://localhost:7046/api/categories/all');
          const responseCategories = await response.json();
          // console.log(responseCategories);
          setCategories(responseCategories);
      }

      fetchCategories_();

  }, []);


  return (
    <Layout categories={categories}>
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
      </Switch>
    </Layout>
  );
}

export default App;
