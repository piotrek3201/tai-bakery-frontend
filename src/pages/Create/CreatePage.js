import classes from './CreatePage.module.css';
import { Fragment, useState, useEffect, useCallback, useContext, useRef } from "react";
import AdditionList from './AdditionList';
import CakeList from './CakeList';
import FillingList from './FillingList';
import GlazeList from './GlazeList';
import SizeList from './SizeList';
import API_URL from '../../utilities/Constants';
import CartContext from '../../components/store/cart-context';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CreatePage = props => {
    const history = useHistory();

    const cartCtx = useContext(CartContext);
    const params = useParams();
    const customCakeId = Number(params.customCakeId);
    const categoryId = params.categoryId;
    const textInput = useRef();

    const [products, setProducts] = useState([]);
    const [size, setSize] = useState({});
    const [cake, setCake] = useState({});
    const [filling, setFilling] = useState({});
    const [glaze, setGlaze] = useState({});
    const [addition, setAddition] = useState({});
    const [text, setText] = useState(" ");
    let customCake = {};

    const link = `${API_URL}/products?categoryId=${categoryId}`;
   
    useEffect(() => {
        const fetchProducts_ = async () => {
            const response_ = await fetch(link);
            const responseData = await response_.json();
            // console.log(responseData);
            setProducts(responseData);
        }

        fetchProducts_();
    }, [params]);

    const addItemToCartHandler = amount => {
        cartCtx.addItem({
          id: customCake.productId,
          name: customCake.name,
          amount: amount,
          price: customCake.price,
          isByWeight: customCake.isByWeight,
          url: customCake.imageUrl,
          isCustomizable: customCake.isCustomizable,
          customization: {
            sizeId: size.id,
            glazeId: glaze.id,
            fillingId: filling.id,
            cakeId: cake.id,
            additionId: addition.id,
            text: text,
            diameter: size.diameter,
            glazeName: glaze.name,
            fillingName: filling.name,
            cakeName: cake.name,
            additionName: addition.name
          }
        });
      };
    
    const submitHandler = event => {
        event.preventDefault();

        setText(textInput.current.value);

        // console.log(typeof products[0].productId + ", " + typeof customCakeId);
        for(let i = 0; i < products.length; i++){
            if(products[i].productId === customCakeId){
                customCake = products[i];
            }
        }
        if(addition.id !== undefined && glaze.id !== undefined && filling.id !== undefined && cake.id !== undefined && size.id !== undefined){
            addItemToCartHandler(1);
            history.replace('/cart');
        } else {
            alert("Nie można dodać do koszyka. Należy wybrać wszystkie opcje.");
        }
            
        console.log(customCakeId);
        console.log(categoryId);
        console.log({
            ...customCake, 
            customization: {
            sizeId: size.id,
            glazeId: glaze.id,
            fillingId: filling.id,
            cakeId: cake.id,
            additionId: addition.id,
            text: text
          }});
      };

    const [additions, setAdditions] = useState([]);

    const fetchAdditions = useCallback (async () => {
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
            // console.log(Additions[1]);
            setAdditions(responseData);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        fetchAdditions();
    }, [fetchAdditions]);

    const getSizes = size => {
        size = Number(size);
        for(var i = 0; i < additions[4].length; i++){
            if(size === additions[4][i].sizeId){
                setSize({
                    id: size,
                    diameter: additions[4][i].diameter
                })
            }
        }
    };

    const getCakes = cake => {
        cake = Number(cake);
        for(var i = 0; i < additions[1].length; i++){
            if(cake === additions[1][i].cakeId){
                setCake({
                    id: cake,
                    name: additions[1][i].cakeName,
                    color: additions[1][i].cakeColor
                })
            }
        }
    };

    const getFillings = filling => {
        filling = Number(filling);
        for(var i = 0; i < additions[2].length; i++){
            if(filling === additions[2][i].fillingId){
                setFilling({
                    id: filling,
                    name: additions[2][i].fillingName,
                    color: additions[2][i].fillingColor
                })
            }
        }
    };

    const getGlazes = glaze => {
        glaze = Number(glaze);
        for(var i = 0; i < additions[3].length; i++){
            if(glaze === additions[3][i].glazeId){
                setGlaze({
                    id: glaze,
                    name: additions[3][i].glazeName,
                    color: additions[3][i].glazeColor
                })
            }
        }
    };

    const getAdditions = addition => {
        addition = Number(addition);
        for(var i = 0; i < additions[0].length; i++){
            if(addition === additions[0][i].additionId){
                setAddition({
                    id: addition,
                    name: additions[0][i].additionName,
                    imageUrl: additions[0][i].additionVisual
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
            <SizeList items={additions[4]} onChangeHandler={getSizes}/>
            <h2>Ciasto</h2>
            <CakeList items={additions[1]} onChangeHandler={getCakes}/>
            <h2>Nadzienie</h2>
            <FillingList items={additions[2]} onChangeHandler={getFillings}/>
            <h2>Polewa</h2>
            <GlazeList items={additions[3]} onChangeHandler={getGlazes}/>
            <h2>Dodatki</h2>
            <AdditionList items={additions[0]} onChangeHandler={getAdditions}/>
            <h2>Napis</h2>
            <div className={classes.text}>
                <textarea type='text' id='text' ref={textInput} placeholder="Wpisz własny tekst..."> </textarea>
            </div>
            <form className={classes.container} onSubmit={submitHandler}>
                <button className={classes.button}>Dodaj do koszyka</button>
            </form>
            
        </div>
    </div>;
};

export default CreatePage;