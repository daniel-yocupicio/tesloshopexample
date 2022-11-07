import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import {Typography} from '@mui/material';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const KidPage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=kid');

  console.log(products);
  

  return (
    <ShopLayout title='Teslo-shop - productos para niños' pageDescription='Todos los productos para niños'>
      <Typography variant="h1" component="h1" fontSize={30}>Tienda</Typography>
      <Typography variant="h2"  component="h2">Todos los productos para niños</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KidPage;