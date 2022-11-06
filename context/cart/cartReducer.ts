import { ICartProduct } from '../../interfaces';
import {CartState} from './';

type uiActionType = 
    | {type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
    | {type: '[Cart] - Add product', payload: ICartProduct}
    | {type: '[Cart] - Update product', payload: ICartProduct}

export const cartReducer = (state: CartState, action: uiActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: action.payload
            }

        case '[Cart] - Add product':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case '[Cart] - Update product':
            return {
                ...state,
                cart: state.cart.map(cartProduct => {
                    if(cartProduct._id === action.payload._id && cartProduct.size === action.payload.size) {
                        cartProduct.quantity = action.payload.quantity;
                    }
                    return cartProduct;
                })
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