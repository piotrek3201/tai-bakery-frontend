import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'ADD_ONE'){
        
        let updatedTotalAmount;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        if(existingCartItem.isByWeight === true) {
            updatedTotalAmount = state.totalAmount + action.item.price * 0.1;
        }
        else {
            updatedTotalAmount = state.totalAmount + action.item.price;
        }

        let updatedItems;

        if(existingCartItem){
            let updatedItem;
            if(existingCartItem.isByWeight === true) {
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + 0.1
                };
            } else {
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + 1
                };
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE'){

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price * existingCartItem.amount;

        const updatedItems = state.items.filter(item => item.id !== action.id);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    }

    if(action.type === 'REMOVE_ONE'){

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedTotalAmount;

        let updatedItems;

        // console.log(existingCartItem.amount.toFixed(1));

        if(existingCartItem.isByWeight === true && existingCartItem.amount.toFixed(2) !== '0.10'){
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 0.1};
            updatedTotalAmount = state.totalAmount - existingCartItem.price * 0.1;
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else if(existingCartItem.isByWeight === false && existingCartItem.amount !== 1) {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedTotalAmount = state.totalAmount - existingCartItem.price;
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedTotalAmount = state.totalAmount - existingCartItem.price * existingCartItem.amount;
            updatedItems = state.items.filter(item => item.id !== action.id);
        } 
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    }

    return defaultCartState;
};

const CardProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item =>{
        dispatchCartAction({type: 'ADD', item: item});
    };
    const addOneItemToCartHandler = item =>{
        dispatchCartAction({type: 'ADD_ONE', item: item});
    };
    
    const removeWholeItemFromCartHandler = id =>{
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const removeItemFromCartHandler = (id, isByWeight) =>{
        dispatchCartAction({type: 'REMOVE_ONE', id: id, isByWeight: isByWeight});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeWholeItem: removeWholeItemFromCartHandler,
        removeItem: removeItemFromCartHandler,
        addOneItem: addOneItemToCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CardProvider;