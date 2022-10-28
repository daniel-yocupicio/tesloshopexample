import {Box, Typography} from '@mui/material';
import { ShopLayout } from "../components/layouts";

// {display: {xs: 'none' , sm: 'block' }}

const Custom404Page = () => {
    return ( 
        <ShopLayout title="Page not found" pageDescription="">
            <Box display="flex" flexDirection={{xs: 'column', sm: 'row'}} justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                <Typography variant="h1" fontSize={{xs: 50, sm: 80}} fontWeight={{xs: 100, sm: 200}}>404</Typography>
                <Typography variant="h1" display={{xs: 'none', sm: 'block'}} fontSize={80} fontWeight={200} marginLeft={1.5}>|</Typography>
                <Typography marginLeft={2} variant="h2" fontSize={{xs: 20, sm: 30}}>Esta página no existe</Typography>
            </Box>  
        </ShopLayout>
     );
}
 
export default Custom404Page;