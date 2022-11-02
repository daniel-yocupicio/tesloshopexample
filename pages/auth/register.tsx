import NextLink from "next/link";
import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

const RegisterPage = () => {
    return ( 
        <AuthLayout title="Ingresar">
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1" sx={{textAlign: 'center'}}>Crear cuenta</Typography>
                    </Grid>

                    <Grid container gap={0.8}>

                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label="Correo"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label="Contraseña"
                                variant="filled"
                                type="password"
                                fullWidth
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size="large" fullWidth>
                            Iniciar Sesión
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{textAlign: 'center'}}>
                            <NextLink href="/auth/login" passHref>
                                <Link underline="always" sx={{alignSelf: 'center'}}>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </AuthLayout>
     );
}
 
export default RegisterPage;