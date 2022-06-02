import classes from './CreatePage.module.css';
import { Fragment, useState, useEffect, useCallback } from "react";
import AdditionList from './AdditionList';
import CakeList from './CakeList';
import FillingList from './FillingList';
import GlazeList from './GlazeList';
import SizeList from './SizeList';
import API_URL from '../../utilities/Constants';

const CreatePage = () => {

    // const link = 'https://localhost:7046/api/customization/';

    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback (async () => {
        let responseData = [];
        let response;
        let responseJson;
        const links = ['additions', 'cakes', 'fillings', 'glazes', 'sizes'];
        try{
            for (let i = 0; i < links.length; i++){
                response = await fetch(API_URL + '/customization/' + links[i] + '/all');
                responseJson = await response.json();
                // console.log(responseJson); 
                responseData.push(responseJson);
            }
            
            console.log(responseData);
            // console.log(products[1]);
            setProducts(responseData);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const showSizes = size => {

    };

    const showCakes = cake => {

    };

    const showFillings = filling => {

    };

    const showGlazes = glaze => {

    };

    const showAdditions = addition => {
        console.log(addition);
    };
        
    return <div className={classes.container}>
        <div className={classes.product_box}>
            
        </div>
        <div className={classes.additions_box}>
            <h2>Rozmiar</h2>
            <SizeList items={products[4]} onChangeHandler={showSizes}/>
            <h2>Ciasto</h2>
            <CakeList items={products[1]} onChangeHandler={showCakes}/>
            <h2>Nadzienie</h2>
            <FillingList items={products[2]} onChangeHandler={showFillings}/>
            <h2>Polewa</h2>
            <GlazeList items={products[3]} onChangeHandler={showGlazes}/>
            <h2>Dodatki</h2>
            <AdditionList items={products[0]} onChangeHandler={showAdditions}/>
        </div>
    </div>;
};

export default CreatePage;