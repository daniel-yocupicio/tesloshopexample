import NextLink from "next/link";
import { GetServerSideProps } from 'next';
import { Box, Button, Grid, TextField, Typography, Link, Chip } from '@mui/material';
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useState, useContext } from 'react';
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const {registerUser} = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
 
    const onRegisterUser = async ({name, email, password}: FormData) => {
        setShowError(false)

        const {hasError, message} = await registerUser(name, email, password);

        if(hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
          
        await signIn('credentials',{email, password});
    }

    return ( 
        <AuthLayout title="Registrar cuenta">
            <form  onSubmit={handleSubmit(onRegisterUser)}>
                <Box sx={{width: 350, padding: '10px 20px'}}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1" sx={{textAlign: 'center'}}>
                                Crear cuenta
                            </Typography>

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
                                    label="Nombre"
                                    variant="filled"
                                    fullWidth
                                    {...register('name',{
                                        required: 'Mínimo 1 carácter',
                                        minLength: {value: 1, message: 'Mínimo 1 carácter'}
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    label="Correo"
                                    variant="filled"
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
                                    helperText={errors.password?.message}
                                />
                            </Grid>

                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                color="secondary" 
                                className="circular-btn" 
                                size="large" 
                                fullWidth
                                type="submit"
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{textAlign: 'center'}}>
                                <NextLink 
                                    href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} 
                                    passHref
                                >
                                    <Link underline="always" sx={{alignSelf: 'center'}}>
                                        ¿Ya tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Box>
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
        props: {
            
        }
    }
}
 
export default RegisterPage;