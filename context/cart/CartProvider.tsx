import React, { useReducer, FC } from 'react';
import { ICartProduct } from '../../interfaces';
import {CartContext, cartReducer} from './';

export interface CartState {
    cart: ICartProduct[];
};

const CART_INITIAL_STATE: CartState = {
    cart: []
};

export const CartProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    return (
        <CartContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </CartContext.Provider>
    );
};