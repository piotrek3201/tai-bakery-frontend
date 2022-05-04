import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <p>Piekarnia!</p>
      <Switch>
        <Route path='/hello'>
          <p>Hello world</p>
        </Route>
        <Route path='/about'>
          <p>About us</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
