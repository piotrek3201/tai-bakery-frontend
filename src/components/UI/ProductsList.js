import { Fragment, useState, useEffect } from "react";
import Card from "./card";
import classes from './card.module.css';

const ProductsList = props => {

    const productsList = props.products.map((product) => (
        <Card key={product.productId} id={product.productId} title={product.name} description={product.description} price={product.price} url={product.imageUrl} isByWeight={product.isByWeight} isCustomizable={product.isCustomizable}/>
    ));

    return <Fragment>
        <h1 className={classes.product_title}>{props.categoryName}</h1>
        
        <div className={classes.grid}>
            {productsList}
        </div>
    </Fragment>
}

export default ProductsList;