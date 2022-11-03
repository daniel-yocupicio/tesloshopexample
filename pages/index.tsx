import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import {Typography} from '@mui/material';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products');

  return (
    <ShopLayout title='Teslo-shop' pageDescription='Inicio'>
      <Typography variant="h1" component="h1" fontSize={30}>Tienda</Typography>
      <Typography>Todos los productos</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default HomePage;
