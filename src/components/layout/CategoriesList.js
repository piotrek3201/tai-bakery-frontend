import { Fragment, useState, useEffect, useCallback } from "react";
import Category from "./Category";
import classes from './MainNavigation.module.css';

const CategoriesList = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://localhost:7046/api/categories/all');
            const responseData = await response.json();
            console.log(responseData);
            setCategories(responseData);
        }

        fetchCategories();
    }, []);

    const categoriesList = categories.map((category) => (
        <Category key={category.categoryId} name={category.categoryName}/>
    ));

    return <Fragment>
        <ul className={classes.drop}>
            {categoriesList}
        </ul>
    </Fragment>
}

export default CategoriesList;