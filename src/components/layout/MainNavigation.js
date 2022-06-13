import { Link } from "react-router-dom";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import logo from './logo/logo.png';
import cart from './logo/shopping-cart.png';
import classes from './MainNavigation.module.css';
import CategoriesList from "./CategoriesList";
import ShoppingCart from "./ShoppingCart";
import CartContext from '../store/cart-context';
import API_URL from "../../utilities/Constants";

function MainNavigation(props) {
  const cartCtx = useContext(CartContext);
  const count = cartCtx.items.length;

  return (
    <Fragment>
      <header>
        <div className={classes.nav}>
          <ul className={classes.list}>
            <Link to='/home'><img className={classes.logo} src={logo} alt='logo'/></Link>
            {props.userData != null && props.userData.role === 1 && (<li className={classes.list_item}><Link to='/admin'>Panel administratora</Link></li>)}
            <li className={classes.list_item}><Link to='/about'>O Nas</Link></li>
            <li className={classes.list_item}>
              <Link to='/products'>Nasze produkty</Link>
              <CategoriesList categories={props.categories}/>
            </li>
            <li className={classes.list_item}><Link to='/contact'>Kontakt</Link></li>
            <li className={classes.list_item}>
              <Link to='/cart' className={classes.cart_btn}>Koszyk</Link>
              <img className={classes.cart_logo} src={cart}/>
              {count !== 0 && <div className={classes.count}>{count}</div>}
              <ShoppingCart />
            </li>
            {!props.isLogged && (<li className={classes.list_item}><Link to='/register'>Rejestracja</Link></li>)}
            {!props.isLogged && (<li className={classes.list_item}><Link to='/login'>Zaloguj</Link></li>)}
            {props.isLogged && (<li className={classes.list_item}><Link to='/logout'>Wyloguj</Link></li>)}
          </ul>
        </div>
    </header>
    </Fragment>
  );
}

export default MainNavigation;