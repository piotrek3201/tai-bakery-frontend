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
        <div className={classes.quote}>
            <p>Życie jest niepewne. Najpierw zjedz deser. - Ernestine Ulmer</p>
        </div>
        <Slider />
        <div className={classes.aboutUs}>
            <img src="https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/uploads/job_description_template/Pastry_Cook.jpg" alt=""></img>
            <div className={classes.shortDescription}>
                <h1>O Nas</h1>
                <p>Cukiernia Słodzianki jest tworzona przez ludzi z prawdziwym zamiłowaniem do dzieł cukierniczych, a wszystkie nasze projekty są wyjątkowe i kreatywne. W ofercie naszej Cukierni znajdują się serniki, bezy, torty, ciasteczka, babeczki z kremem i torty. Ale to nie wszystko – wykonujemy także torty na zamówienie. Do każdego zamówienia podchodzimy indywidualnie, wkładając całe serce w staranne wykonanie produktu. Po nasze słodkości nawet nie musisz wychodzić z domu – to my dostarczymy je do Ciebie!</p>
            </div>
        </div>
        <div className={classes.aboutCustomCakes}>
            <div className={classes.createCakeDescritpion}>
                <h1>Stwórz własny tort!</h1>
                <p>Już teraz skorzystaj z Naszego kreatora tortów i stwórz swój wymarzony tort, a my dostarczymy go na wybrany przez Ciebie termin. Wybierz rozmiar tortu, smak nadzienia, ciasta oraz polewy, a także dodaj ulubione dodatki. Na torcie możesz umieścić własny napis np. życzenia urodzinowe.</p>
            </div>
            <img src="https://imgmedia.lbb.in/media/2020/04/5e86d3b0da096c5fe43ec74f_1585894320457.jpeg" alt=""></img>
        </div>
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