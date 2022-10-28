import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import {Typography, Grid, Card, CardActionArea, CardMedia} from '@mui/material';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title='Teslo-shop' pageDescription=''>
      <Typography>Tienda</Typography>
      <Typography>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map(product => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia 
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>

    </ShopLayout>
  )
}

export default Home
