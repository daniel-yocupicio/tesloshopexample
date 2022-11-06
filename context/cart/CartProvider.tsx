import React, { useReducer, FC, useEffect } from 'react';
import Cookie from 'js-cookie';
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

    useEffect(() => {
        try {
            const cookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: cookies});
        } catch (e) {
            dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: []});
        }
    })

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart]);

    const addProductToCart = (product: ICartProduct) => {

        const oldProduct = state.cart.find( productInCart => productInCart._id === product._id && productInCart.size === product.size );

        if(!oldProduct) {
            return dispatch({type: '[Cart] - Add product', payload: product});
        } else {
            const quantity = oldProduct.quantity + product.quantity;
            return dispatch({type: '[Cart] - Update product', payload: {...product, quantity}})
        }

        // const productInCart = state.cart.some( p => p._id === product._id );
        // if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        // if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // // Acumular
        // const updatedProducts = state.cart.map( p => {
        //     if ( p._id !== product._id ) return p;
        //     if ( p.size !== product.size ) return p;

        //     // Actualizar la cantidad
        //     p.quantity += product.quantity;
        //     return p;
        // });

        // dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                addProductToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};