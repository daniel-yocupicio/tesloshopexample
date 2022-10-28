import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import {Typography} from '@mui/material';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title='Teslo-shop' pageDescription=''>
      <Typography>Tienda</Typography>
      <Typography>Todos los productos</Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}

export default Home
