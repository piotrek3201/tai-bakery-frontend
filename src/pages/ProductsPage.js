import { Fragment, useState, useEffect } from "react";
import classes from './ProductsPage.module.css';
import ProductsList from "../components/UI/ProductsList";
import { useParams } from "react-router-dom";

const ProductsPage = props => {

    const params = useParams();
    // console.log(params.categoryName);
    let id;
    if(!params.categoryId){
        id = 0;
    } else {
        id = params.categoryId;
        
    }

    let link = "";

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");

    if(id === 0){
        link = 'https://localhost:7046/api/products/all';
    } else {
        link = `https://localhost:7046/api/products?categoryId=${id}`;
    }

    useEffect(() => {
        const fetchProducts_ = async () => {
            const response_ = await fetch(link);
            const responseData = await response_.json();
            if(responseData.length !== 0){
                if(id !== 0)
                    setName(responseData[0].category.categoryName); 
                else
                setName("Produkty");
            }
            else 
                setName("Brak produktów");
            console.log(responseData);
            setProducts(responseData);
        }

        fetchProducts_();
    }, [params, name]);

    return <ProductsList products={products} categoryId={id} categoryName={name}/>
};

export default ProductsPage;