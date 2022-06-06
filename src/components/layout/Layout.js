import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import CardProvider from '../store/CartProvider';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <CardProvider>
      <div className={classes.layout}>
        <MainNavigation categories={props.categories} userData={props.userData} isLogged={props.isLogged}/>
        <main className={classes.main}>
          {props.children}
        </main>
      </div>
    </CardProvider>
    
  );
}

export default Layout;