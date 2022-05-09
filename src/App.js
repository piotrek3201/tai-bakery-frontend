import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/hello'>
          <p>Hello world</p>
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Route path='/*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
