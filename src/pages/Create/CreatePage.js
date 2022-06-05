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

    const [size, setSize] = useState([]);
    const [cake, setCake] = useState([]);
    const [filling, setFilling] = useState([]);
    const [glaze, setGlaze] = useState([]);
    const [addition, setAddition] = useState([]);

    const getSizes = size => {
        for(var i = 0; i < products[4].length; i++){
            if(size == products[4][i].sizeId){
                setSize({
                    id: size,
                    diameter: products[4][i].diameter
                })
            }
        }
        // console.log(size);
        // setSize(size);
    };

    const getCakes = cake => {
        for(var i = 0; i < products[1].length; i++){
            if(cake == products[1][i].cakeId){
                setCake({
                    id: cake,
                    name: products[1][i].cakeName,
                    color: products[1][i].cakeColor
                })
            }
        }
    };

    const getFillings = filling => {
        for(var i = 0; i < products[2].length; i++){
            if(filling == products[2][i].fillingId){
                setFilling({
                    id: filling,
                    name: products[2][i].fillingName,
                    color: products[2][i].fillingColor
                })
            }
        }
    };

    const getGlazes = glaze => {
        for(var i = 0; i < products[3].length; i++){
            if(glaze == products[3][i].glazeId){
                setGlaze({
                    id: glaze,
                    name: products[3][i].glazeName,
                    color: products[3][i].glazeColor
                })
            }
        }
    };

    const getAdditions = addition => {
        for(var i = 0; i < products[0].length; i++){
            if(addition == products[0][i].additionId){
                setAddition({
                    id: addition,
                    name: products[0][i].additionName,
                    imageUrl: products[0][i].additionVisual
                })
            }
        }
    };
        
    return <div className={classes.container}>
        <div className={classes.product_box}>
            <div className={classes.cake} style={{backgroundColor: glaze.color, backgroundImage: `url(${addition.imageUrl})`}}>
            </div>
            <br />
            <div className={classes.slice} style={{backgroundColor: glaze.color}}>
                <div className={classes.biscuit_top} style={{backgroundColor: cake.color}}></div>
                <div className={classes.filling} style={{backgroundColor: filling.color}}></div>
                <div className={classes.biscuit_bottom} style={{backgroundColor: cake.color}}></div>
            </div>
        </div>
        <div className={classes.additions_box}>
            <h2>Rozmiar (cm)</h2>
            <SizeList items={products[4]} onChangeHandler={getSizes}/>
            <h2>Ciasto</h2>
            <CakeList items={products[1]} onChangeHandler={getCakes}/>
            <h2>Nadzienie</h2>
            <FillingList items={products[2]} onChangeHandler={getFillings}/>
            <h2>Polewa</h2>
            <GlazeList items={products[3]} onChangeHandler={getGlazes}/>
            <h2>Dodatki</h2>
            <AdditionList items={products[0]} onChangeHandler={getAdditions}/>
            {/* <button className={classes.button} type='submit'>Zapisz</button> //Kiedyś będzie tu guzik */}
        </div>
    </div>;
};

export default CreatePage;