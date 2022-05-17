import { Link } from "react-router-dom";
import { Fragment } from "react";
import logo from './logo/logo.png';
import classes from './MainNavigation.module.css';

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
              <ul className={classes.drop}>
                <li><Link to='/cakes'>Ciasta</Link></li>
                <li><Link to='/layer-cakes'>Torty</Link></li>
                <li><Link to='/cookies'>Ciastka</Link></li>
                <li><Link to='/pralines'>Praliny</Link></li>
                <li><Link to='/ice-cream'>Lody</Link></li>
              </ul>
            </li>
            <li className={classes.list_item}><Link to='/create'>Stwórz własny tort</Link></li>
            <li className={classes.list_item}><Link to='/contact'>Kontakt</Link></li>
            <li className={classes.list_item}><Link to='/cart'>Koszyk</Link></li>
          </ul>
        </div>
    </header>
    </Fragment>
  );
}

export default MainNavigation;