import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/products'>
          <ProductsPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Route path='/*'>
          <HomePage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
