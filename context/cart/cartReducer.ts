import { ICartProduct } from '../../interfaces';
import {CartState} from './';

type uiActionType = 
    | {type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
    | {type: '[Cart] - Add product', payload: ICartProduct}

export const cartReducer = (state: CartState, action: uiActionType): CartState => {
    switch (action.type) {

        default:
            return state;
    }
}