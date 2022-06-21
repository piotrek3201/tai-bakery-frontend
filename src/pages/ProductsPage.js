import { useState, useEffect } from "react";
import ProductsList from "../components/UI/ProductsList";
import { useParams } from "react-router-dom";
import API_URL from "../utilities/Constants";

const ProductsPage = props => {

    const params = useParams();
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
        link = `${API_URL}/products/all`;
    } else {
        link = `${API_URL}/products?categoryId=${id}`;
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
            setProducts(responseData);
        }

        fetchProducts_();
    }, [params, name, id, link]);

    return <ProductsList products={products} categoryId={id} categoryName={name}/>
};

export default ProductsPage;