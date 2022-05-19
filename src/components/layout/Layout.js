import { Fragment } from 'react';
import MainNavigation from './MainNavigation';

import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation categories={props.categories}/>
      <main className={classes.main}>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;