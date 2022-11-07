import {useContext} from 'react';
import { Box, CardActionArea, CardMedia, Grid, Link, Typography, Button } from "@mui/material";
import NextLink from 'next/link';
import { ItemCounter } from "../ui";
import { FC } from "react";
import { CartContext } from '../../context/cart/CartContext';
import { ICartProduct, IOperation } from '../../interfaces';

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({editable}) => {
    
    const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext);

    const onNewCartQuantity = (product: ICartProduct, operation: IOperation) => {
        if (operation === "ADD") {
            updateCartQuantity({...product, quantity: product.quantity + 1})
        } else {
            updateCartQuantity({...product, quantity: product.quantity - 1 })
        }
    }
   
    return ( 
        <>
            {
                cart.map(product => (
                    <Grid container key={product.slug + product.size} spacing={2} sx={{mb:1}}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={`/products/${product.image}`}
                                            component="img"
                                            sx={{borderRadius: '5px'}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla <strong>{product.size}</strong></Typography>

                                {editable 
                                    ?   <ItemCounter 
                                            maxQuantity={0} 
                                            quantity={product.quantity} 
                                            onNewQuantity={(operation) => onNewCartQuantity(product, operation)} 
                                        /> 
                                    :   <Typography>
                                            No. piezas <strong>{product.quantity}</strong>
                                        </Typography>
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

                            {
                                editable &&
                                <Button 
                                    variant="text" 
                                    color="secondary"
                                    onClick={() => removeCartProduct(product)}
                                >
                                    Borrar
                                </Button>
                            }

                        </Grid>
                    </Grid>
                ))
            }
        </>
     );
}
 