import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { ShopLayout } from '../../components/layouts';
import {Box, Typography} from '@mui/material';
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
    query: string;
    foundProducts: boolean;
}

const SearchPage: NextPage<Props> = ({products, query, foundProducts}) => {
  return (
    <ShopLayout title='Teslo-shop - Search' pageDescription={`Resultados de la búsqueda de ${query}`}>
      <Typography variant="h1" component="h1" fontSize={30}>Buscar productos</Typography>
        {
            foundProducts 
                ? <Typography textTransform={'capitalize'}>Todos los productos con: {query}</Typography>
                : <Box display="flex">
                    <Typography>No encontramos ningún producto con: </Typography>
                    <Typography color="error" sx={{ml: 1}} textTransform={'capitalize'}> {query} </Typography>
                  </Box>
        }  
      
      
      <ProductList products={products} />
    
    
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {query = ''} = params as {query: string};

    if(query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;

    if(!foundProducts) {
        products = await dbProducts.getOtherProducts();
    }

    return {
        props: {
            products,
            query,
            foundProducts,
        }
    }
}

export default SearchPage;