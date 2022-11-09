import {useState, useContext} from 'react';
import { GetStaticProps, GetStaticPaths,  NextPage } from 'next'
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShop } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from '../../components/products/SizeSelector';
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { dbProducts } from "../../database";
import { IOperation } from '../../interfaces';
import { CartContext } from '../../context/cart/CartContext';
import { useRouter } from 'next/router';

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({product}) => {
    const {addProductToCart, cart} = useContext(CartContext);
    const router = useRouter();
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });

    const selectSize = (size: ISize) => {
        setTempCartProduct({...tempCartProduct, size: size})
    }

    const onNewQuantity = (operation: IOperation) => {
        if (operation === "ADD") {
            tempCartProduct.quantity < product.inStock
                && setTempCartProduct({...tempCartProduct, quantity: tempCartProduct.quantity + 1})
        } else {
            tempCartProduct.quantity > 1 
                && setTempCartProduct({...tempCartProduct, quantity: tempCartProduct.quantity - 1 })
        }
    }

    const onAddProductToCart = () => {        
        if(tempCartProduct.quantity < 1 || tempCartProduct.size === undefined || tempCartProduct.quantity > product.inStock) {
            return;
        }   

        if ( product.inStock - tempCartProduct.quantity < 1) {
            return;
        }

        addProductToCart(tempCartProduct);
        router.push('/cart');
    }

    /**
        Se puede acceder al valor desde la función del useState como un callback

        const selectSize = (size: ISize) => {
            setTempCartProduct(currentProduct => {
                ...currentProduct,
                size
            })
        }
     */

    return ( 
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7} >
                    <ProductSlideShop images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display="flex" flexDirection={"column"}>

                        <Typography variant="h1" component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

                        <Box display="flex" sx={{my:2}} alignItems="center">
                            <Typography variant="subtitle2">Cantidad:</Typography>
                            <ItemCounter 
                                quantity={tempCartProduct.quantity}
                                onNewQuantity={onNewQuantity}
                                maxQuantity={product.inStock}
                            />
                        </Box>

                        <Box display="flex" sx={{my:2}}>
                            <Typography variant="subtitle2" marginTop={0.5}>Tamaño:</Typography>
                            <SizeSelector 
                                selectedSize={tempCartProduct.size} 
                                sizes={product.sizes} 
                                onSelectedSize={selectSize}
                            />
                        </Box>

                        {
                            product.inStock > 0
                            ? 
                                <Button 
                                    color={tempCartProduct.size ? "secondary" : "error"} 
                                    className="circular-btn"
                                    disabled={tempCartProduct.size ? false : true}
                                    onClick={onAddProductToCart}
                                >
                                    {tempCartProduct.size ? "Agregar al carrito" : "Seleccione una talla"} 
                                </Button>
                            : <Chip label="No hay disponibles" color="error" variant="outlined" />
                        }

                        <Box sx={{mt:3}}>
                            <Typography variant="subtitle2">Descripción</Typography>
                            <Typography variant="body2" textAlign={'justify'}>{product.description}</Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
     );
}

//  SSR - esta función realiza una consulta antes de renderizar la vista para mostrar los datos,
//        no es una una manera estatica por lo tanto se ejecuta n veces.
//
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const product = await dbProducts.getProductBySlug(`${ctx!.params!.slug }`); 

//     if(!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
//           product      
//         }
//     }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productSlugs.map(obj => ({
            params: {
                slug: obj.slug
            }
        })) ,
        // paths: [
        //     {
        //         params: {
                    
        //         }
        //     }
        // ],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const { slug = '' } = params as {slug: string}
    const product = await dbProducts.getProductBySlug(slug);

    if(!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 240000,
    }
}

export default ProductPage;