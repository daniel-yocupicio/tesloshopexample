import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

import { countries } from "../../utils";
import { CartContext } from '../../context';
import { ShopLayout } from "../../components/layouts";

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const AdressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: '',
            phone: '',
        }
    });

    const onSubmitAddress = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

    useEffect(() => {
        reset(getAddressFromCookies());
    }, [reset])

    return (
        //     <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
        //     <form onSubmit={ handleSubmit( onSubmitAddress ) }>


        //         <Typography variant="h1" component='h1'>Dirección</Typography>

        //         <Grid container spacing={ 2 } sx={{ mt: 2 }}>

        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField
        //                     label='Nombre'
        //                     variant="filled"
        //                     fullWidth 
        //                     { ...register('firstName', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.firstName }
        //                     helperText={ errors.firstName?.message }
        //                 />
        //             </Grid>
        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField
        //                     label='Apellido'
        //                     variant="filled"
        //                     fullWidth
        //                     { ...register('lastName', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.lastName }
        //                     helperText={ errors.lastName?.message }
        //                     />
        //             </Grid>

        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField
        //                     label='Dirección'
        //                     variant="filled"
        //                     fullWidth
        //                     { ...register('address', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.address }
        //                     helperText={ errors.address?.message }
        //                     />
        //             </Grid>
        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField 
        //                     label='Dirección 2 (opcional)' 
        //                     variant="filled" 
        //                     fullWidth 
        //                     { ...register('address2')}
        //                 />
        //             </Grid>

        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField 
        //                     label='Código Postal'
        //                     variant="filled"
        //                     fullWidth
        //                     { ...register('zip', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.zip }
        //                     helperText={ errors.zip?.message }
        //                     />
        //             </Grid>
        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField
        //                     label='Ciudad'
        //                     variant="filled"
        //                     fullWidth
        //                     { ...register('city', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.city }
        //                     helperText={ errors.city?.message }
        //                     />
        //             </Grid>

        //             <Grid item xs={12} sm={ 6 }>
        //                 {/* <FormControl fullWidth> */}
        //                     <TextField
        //                         // select
        //                         variant="filled"
        //                         label="País"
        //                         fullWidth
        //                         // value={Cookies.get('country') || countries.countries[0].code}
        //                         // defaultValue={ Cookies.get('country') || countries.countries[0].code }
        //                         // defaultChecked
        //                         { ...register('country', {
        //                             required: 'Este campo es requerido'
        //                         })}
        //                         error={ !!errors.country }
        //                         helperText={errors.country?.message}
        //                     >
        //                         {/* {
        //                             countries.countries.map( country => (
        //                                 <MenuItem 
        //                                     key={ country.code }
        //                                     value={ country.code }
        //                                 >{ country.name }</MenuItem>
        //                             ))
        //                         } */}
        //                     </TextField>
        //                 {/* </FormControl> */}
        //             </Grid>
        //             <Grid item xs={12} sm={ 6 }>
        //                 <TextField
        //                     label='Teléfono'
        //                     variant="filled"
        //                     fullWidth
        //                     { ...register('phone', {
        //                         required: 'Este campo es requerido'
        //                     })}
        //                     error={ !!errors.phone }
        //                     helperText={ errors.phone?.message }
        //                     />
        //             </Grid>

        //         </Grid>


        //         <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
        //             <Button type="submit" color="secondary" className="circular-btn" size="large">
        //                 Revisar pedido
        //             </Button>
        //         </Box>

        //     </form>
        // </ShopLayout>

        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
            <form onSubmit={handleSubmit(onSubmitAddress)}>


                <Typography variant="h1" component='h1'>Dirección</Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            variant="filled"
                            fullWidth
                            {...register('firstName', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellido'
                            variant="filled"
                            fullWidth
                            {...register('lastName', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección'
                            variant="filled"
                            fullWidth
                            {...register('address', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección 2 (opcional)'
                            variant="filled"
                            fullWidth
                            {...register('address2')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Código Postal'
                            variant="filled"
                            fullWidth
                            {...register('zip', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Ciudad'
                            variant="filled"
                            fullWidth
                            {...register('city', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* <FormControl fullWidth> */}
                        <TextField
                            // select
                            variant="filled"
                            label="País"
                            fullWidth
                            // defaultValue={ Cookies.get('country') || countries[0].code }
                            {...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        />
                        {/* {
                                countries.map( country => (
                                    <MenuItem 
                                        key={ country.code }
                                        value={ country.code }
                                    >{ country.name }</MenuItem>
                                ))
                            }
                        </TextField> */}
                        {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            variant="filled"
                            fullWidth
                            {...register('phone', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>

                </Grid>


                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Revisar pedido
                    </Button>
                </Box>

            </form>
        </ShopLayout>

    );
}

//  Verificar si el token es correcto, esta es una manera de checar si el token de 
//  las cookies es correcto y si no se va a login
//
// import { GetServerSideProps } from 'next'
// import { jwt } from "../../utils";

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const {token = ''} = req.cookies;

//     let userId = '';
//     let isValidToken = false;

//     try {
//         userId = await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch(e) {
//         isValidToken = false;
//     }

//     if(!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }


export default AdressPage;