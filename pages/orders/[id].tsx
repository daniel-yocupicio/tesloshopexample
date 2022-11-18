import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { Grid, Typography, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CreditCardOffOutlined, CreditCardOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {
    return ( 
        <ShopLayout title="Resumen de compra" pageDescription="Resumen de la compa">
            <Typography variant="h1" component="h1">Compra - {order._id}</Typography>

            {
                order.isPaid ? 
                    <Chip 
                        sx={{my: 2}}
                        label="Pagado"
                        variant="outlined"
                        color="success"
                        icon={<CreditCardOutlined />}
                    /> 
                :
            
                    <Chip 
                        sx={{my: 2}}
                        label="Pago pendiente"
                        variant="outlined"
                        color="error"
                        icon={<CreditCardOffOutlined />}
                    />  
            }

            <Grid container sx={{mt: 1}}>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>

                <Grid item xs={12} sm={5}>  
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h1">Resumen ({order.numberOfItems} producto{order.numberOfItems > 1 && 's'})</Typography>
                            <Divider sx={{my: 1}} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                            <Typography>{order.shippingAddress.address}</Typography>
                            <Typography>{order.shippingAddress.city} {order.shippingAddress.zip}</Typography>
                            <Typography>{order.shippingAddress.country}</Typography>
                            <Typography>{order.shippingAddress.phone}</Typography>

                            <Divider sx={{mt: 1}}/>

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary summary={{
                                numberOfItems: order.numberOfItems,
                                subTotal:order.subTotal,
                                tax:order.tax,
                                total:order.total,
                            }} />

                            <Box sx={{mt: 3}}>
                                {
                                order.isPaid ? 
                                    <Chip 
                                        sx={{my: 2}}
                                        label="Pagado"
                                        variant="outlined"
                                        color="success"
                                        icon={<CreditCardOutlined />}
                                    /> 
                                    :
                                    <Button color="secondary" className="circular-btn" fullWidth>
                                        <h1>Pagar</h1>
                                    </Button> 
                                }

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
     );
}
 

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {

    const {id = ''} = query;

    const session: any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: `/auth/login?p=orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if(!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if(order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;