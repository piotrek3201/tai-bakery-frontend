import { Link } from "react-router-dom";
import { Fragment } from "react";
import logo from './logo/logo.png';
import cart from './logo/shopping-cart.png';
import classes from './MainNavigation.module.css';
import CategoriesList from "./CategoriesList";

function MainNavigation() {
  return (
    <Fragment>
      <header>
        <div className={classes.nav}>
          <ul className={classes.list}>
            <Link to='/home'><img className={classes.logo} src={logo} alt='logo'/></Link>
            <li className={classes.list_item}><Link to='/about'>O nas</Link></li>
            <li className={classes.list_item}>
              <Link to='/products'>Nasze produkty</Link>
              <CategoriesList />
            </li>
            <li className={classes.list_item}><Link to='/create'>Stwórz własny tort</Link></li>
            <li className={classes.list_item}><Link to='/contact'>Kontakt</Link></li>
            <li className={classes.list_item}><Link to='/cart'>Koszyk</Link></li>
            <img src={cart}/>
          </ul>
        </div>
    </header>
    </Fragment>
  );
}

export default MainNavigation;