import { Link } from "react-router-dom";
import { Fragment } from "react";

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <Fragment>
      <header>
        <div className={classes.nav}>
          <ul>
            <li><Link to='/hello'>Strona główna</Link></li>
            <li><Link to='/about'>O nas</Link></li>
            <li><Link to='/shop'>Produkty</Link></li>
            <li><Link to='/cart'>Koszyk</Link></li>
          </ul>
        </div>
    </header>
    </Fragment>
  );
}

export default MainNavigation;