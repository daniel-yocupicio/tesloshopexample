import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import {Typography} from '@mui/material';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const WomenPage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=women');

  return (
    <ShopLayout title='Teslo-shop - productos para mujeres' pageDescription='Todos los productos de mujeres'>
      <Typography variant="h1" component="h1" fontSize={30}>Tienda</Typography>
      <Typography variant="h2"  component="h2">Todos los productos para mujeres</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage;