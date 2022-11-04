import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { NextPage } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShop } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from '../../components/products/SizeSelector';
import { IProduct } from "../../interfaces";
import { dbProducts } from "../../database";

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({product}) => {
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
                            <ItemCounter />
                        </Box>

                        <Box display="flex" sx={{my:2}}>
                            <Typography variant="subtitle2" marginTop={0.5}>Tamaño:</Typography>
                            <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes} />
                        </Box>

                        <Button color="secondary" className="circular-btn">Agregar al carrito</Button>

                        {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}

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