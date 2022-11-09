import { ICartProduct } from '../../interfaces';
import {CartState} from './';

type uiActionType = 
    | {type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
    | {type: '[Cart] - Add product', payload: ICartProduct}
    | {type: '[Cart] - Update product in cart', payload: ICartProduct}
    | {type: '[Cart] - Change product quantity', payload: ICartProduct}
    | {type: '[Cart] - Remove product in car', payload: ICartProduct}
    | {
        type: '[Cart] - Update order summary', 
        payload: {    
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
    }}

export const cartReducer = (state: CartState, action: uiActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }

        case '[Cart] - Add product':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case '[Cart] - Update product in cart':
            return {
                ...state,
                cart: state.cart.map(cartProduct => {
                    if(cartProduct._id === action.payload._id && cartProduct.size === action.payload.size) {
                        cartProduct.quantity = action.payload.quantity;
                    }
                    return cartProduct;
                })
            }

        case '[Cart] - Change product quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    return action.payload;
                })
            }

        case '[Cart] - Remove product in car':
            return {
                ...state,
                cart: state.cart.filter(product => 
                    !(product._id === action.payload._id && product.size === action.payload.size)
                    )
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        // case '[Cart] - Update products in cart':
        //     return {
        //         ...state,
        //         cart: [...action.payload]
        //     }

        default:
            return state;
    }
}