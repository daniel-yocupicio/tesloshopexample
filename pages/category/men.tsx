import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import {Typography} from '@mui/material';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=men');

  return (
    <ShopLayout title='Teslo-shop - productos para hombres' pageDescription='Todos los productos para mujeres'>
      <Typography variant="h1" component="h1" fontSize={30}>Tienda</Typography>
      <Typography variant="h2"  component="h2">Todos los productos para hombres</Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default MenPage;