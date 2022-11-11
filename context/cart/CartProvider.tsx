import React, { useReducer, FC, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import {CartContext, cartReducer} from './';
//import { IOperation } from '../../interfaces/cart';

export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;
};

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
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
    }, []);

    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
                firstName : Cookie.get('firstName') || '',
                lastName  : Cookie.get('lastName') || '',
                address   : Cookie.get('address') || '',
                address2  : Cookie.get('address2') || '',
                zip       : Cookie.get('zip') || '',
                city      : Cookie.get('city') || '',
                country   : Cookie.get('country') || '',
                phone     : Cookie.get('phone') || '',
            }
            
            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, []);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart]);

    useEffect(() => {
        //reduce es una función de arrays que tiene dos parametros callback, uno es el valor previo y el otro es 
        //el valor actual, entonces se le pasa lo que tiene la función y despues el valor inicial que es 0
        //entonces inicia en 0 y el prev = 0 y el current = al valor actual y realiza la suma
        // [actual] + 0 = nuevo valor.
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev ,0);
        //Esta constante es de ejemplo pero no deberia ser constante porque puede variar.
        const taxtRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems, 
            subTotal,
            tax: subTotal * taxtRate,
            total: subTotal * (taxtRate + 1)
        }

        dispatch({type: '[Cart] - Update order summary', payload: orderSummary});
    }, [state.cart]);

    const addProductToCart = (product: ICartProduct) => {

        const oldProduct = state.cart.find( productInCart => productInCart._id === product._id && productInCart.size === product.size );

        if(!oldProduct) {
            return dispatch({type: '[Cart] - Add product', payload: product});
        } else {
            const quantity = oldProduct.quantity + product.quantity;
            return dispatch({type: '[Cart] - Update product in cart', payload: {...product, quantity}})
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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({type: '[Cart] - Change product quantity', payload: product});
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({type: '[Cart] - Remove product in car', payload: product})
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('city',address.city);
        Cookie.set('country',address.country);
        Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                addProductToCart,
                updateCartQuantity,
                removeCartProduct,
                updateAddress,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};