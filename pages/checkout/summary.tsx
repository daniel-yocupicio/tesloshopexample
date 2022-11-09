import NextLink from 'next/link';
import { Grid, Typography, Card, CardContent, Divider, Box, Button, Link } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const SummaryPage = () => {
    return ( 
        <ShopLayout title="Resumen de compra" pageDescription="Resumen de la compa">
            <Typography variant="h1" component="h1">Resumen de la compra</Typography>

            <Grid container sx={{mt: 1}}>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5}>  
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h1">Resumen (3 productos)</Typography>
                            <Divider sx={{my: 1}} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Daniel Guadalupe Yocupicio Vázquez</Typography>
                            <Typography>Xoloapan #857 Linda Vista</Typography>
                            <Typography>28979</Typography>
                            <Typography>Villa de Alvarez, Colima</Typography>
                            <Typography>México</Typography>
                            <Typography>+52 3121381009</Typography>

                            <Divider sx={{mt: 1}}/>

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{mt: 3}}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirmar productos
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
     );
}
 
export default SummaryPage;