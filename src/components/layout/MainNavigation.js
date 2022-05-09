import { NavLink, Link } from "react-router-dom";

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Cukiernia</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/hello' activeClassName={classes.active}>
              Strona główna
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' activeClassName={classes.active}>
              O nas
            </NavLink>
          </li>
          <li>
            <NavLink to='/shop' activeClassName={classes.active}>
              Produkty
            </NavLink>
          </li>
          <li>
            <NavLink to='/cart' activeClassName={classes.active}>
              Koszyk
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;