import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import logo from './logo/logo.png';
import cart from './logo/shopping-cart.png';
import classes from './MainNavigation.module.css';
import CategoriesList from "./CategoriesList";
import ShoppingCart from "./ShoppingCart";
import CartContext from '../store/cart-context';

function MainNavigation(props) {

  const cartCtx = useContext(CartContext);
  const count = cartCtx.items.length;

  // console.log(count);

  return (
    <Fragment>
      <header>
        <div className={classes.nav}>
          <ul className={classes.list}>
            <Link to='/home'><img className={classes.logo} src={logo} alt='logo'/></Link>
            <li className={classes.list_item}><Link to='/admin'>O nas</Link></li>
            <li className={classes.list_item}>
              <Link to='/products'>Nasze produkty</Link>
              <CategoriesList categories={props.categories}/>
            </li>
            <li className={classes.list_item}><Link to='/create'>Stwórz własny tort</Link></li>
            <li className={classes.list_item}><Link to='/contact'>Kontakt</Link></li>
            <li className={classes.list_item}>
              <Link to='/cart' className={classes.cart_btn}>Koszyk</Link>
              <img className={classes.cart_logo} src={cart}/>
              {count !== 0 && <div className={classes.count}>{count}</div>}
              <ShoppingCart />
            </li>
          </ul>
        </div>
    </header>
    </Fragment>
  );
}

export default MainNavigation;