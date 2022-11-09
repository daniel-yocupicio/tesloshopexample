import { useContext, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Grid, TextField, Typography, Link, Chip } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import tesloApi from '../../api/tesloAPI';
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
    email: string,
    password: string,
}

const LoginPage = () => {

    const router = useRouter();
    const {loginUser} = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async ({email, password}: FormData) => {
        setShowError(false)

        const isValidLogin = await loginUser(email, password);

        if(!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
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
                                            // validate retorna un valor (val) => validations.isEmail(val)
                                            // entonces al solo ser un valor solamente se pasa como se muestra 
                                            // en la siguiente linea 
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

                        <Grid item xs={12}>
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

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
     );
}
 
export default LoginPage;