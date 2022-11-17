import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next'
import NextLink from "next/link";
import { Box, Button, Grid, TextField, Typography, Link, Chip, Divider } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getSession, signIn, getProviders } from "next-auth/react";

type FormData = {
    email: string,
    password: string,
}

const LoginPage = () => {

    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState<any>({});

    useEffect(()=>{
        getProviders().then(prov => {
            setProviders(prov);
        })
    },[])

    const onLoginUser = async ({email, password}: FormData) => {
        setShowError(false)

        await signIn('credentials', {email, password});
    }

    return ( 
        <AuthLayout title="Ingresar">
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{width: 350, padding: '10px 20px'}}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1" sx={{textAlign: 'center'}}>Iniciar Sesión</Typography>
                            <Chip 
                                label="Los datos de sesión no son correctos."
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{display: showError ? 'flex' : 'none'}}
                            />  
                        </Grid>

                        <Grid container gap={0.8}>

                            <Grid item xs={12}>
                                <TextField 
                                    label="Correo"
                                    variant="filled"
                                    type="email"
                                    fullWidth
                                    {...register('email',{ 
                                            required: 'Este campo es requerido',
                                            // (val) => validations.isEmail(val) or validations.isEmail
                                            validate: validations.isEmail
                                        })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField 
                                    label="Contraseña"
                                    variant="filled"
                                    type="password"
                                    fullWidth
                                    {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: {value: 6, message: 'Mínimo 6 caracteres'}
                                        })}
                                    error={!!errors.password}
                                    helperText={errors.email?.message}
                                />
                            </Grid>

                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                type='submit'
                                color="secondary" 
                                className="circular-btn" 
                                size="large" 
                                fullWidth
                                disabled={showError}
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent={'end'}>
                            <Box sx={{textAlign: 'center'}}>
                                <NextLink 
                                    href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} 
                                    passHref
                                >
                                    <Link underline="always" sx={{alignSelf: 'center'}}>
                                        ¿No tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Box>
                        </Grid>

                        <Grid item xs={12} display="flex" flexDirection={"column"} justifyContent={'end'}>
                            <Divider sx={{width: '100%', mb: 2}} />
                            {
                                Object.values(providers).map((provider:any) => {

                                    if(provider.id === 'credentials') {
                                        return (
                                            <div key={'credentials'}></div>
                                        )
                                    }

                                    return(
                                        <Button 
                                            key={provider.id}
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{mb: 1}}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
     );
}
 

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const {p = '/'} = query;
    const session = await getSession({req});

    if(session) {
        return  {
            redirect: {
                destination: p.toString(),
                permanent: true,
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage;