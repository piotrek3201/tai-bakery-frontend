import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from './HomePage.module.css';
import Slider from "../components/Slider/Slider";
import cake from "../components/layout/logo/cake.png";
import layercake from "../components/layout/logo/layercake.png";
import cupcake from "../components/layout/logo/cupcake.png";
import icecream from "../components/layout/logo/icecream.png";
import cookie from "../components/layout/logo/cookie.png";

const HomePage = () => {
    return <Fragment>
        <Slider />
        <div className={classes.categoriesContainer}>
            <Link to='/products'><img className={classes.flower} src={cake} alt='p1'/></Link>
            <Link to='/products'><img className={classes.flower} src={cupcake} alt='p2'/></Link>
            <Link to='/products'><img className={classes.flower} src={cookie} alt='p3'/></Link>
            <Link to='/products'><img className={classes.flower} src={icecream} alt='p4'/></Link>
            <Link to='/products'><img className={classes.flower} src={layercake} alt='p5'/></Link>
        </div>
    </Fragment> 
};

export default HomePage;