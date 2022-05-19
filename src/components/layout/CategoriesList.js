import { Fragment, useState, useEffect, useCallback } from "react";
import Category from "./Category";
import classes from './MainNavigation.module.css';

const CategoriesList = (props) => {

    const categoriesList = props.categories.map((category) => (
        <Category key={category.categoryId} id={category.categoryId} name={category.categoryName}/>
    ));

    return <Fragment>
        <ul className={classes.drop}>
            {categoriesList}
        </ul>
    </Fragment>
}

export default CategoriesList;