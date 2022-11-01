import { Grid, Typography } from '@mui/material';


export const OrderSummary = () => {
    return ( 
        <Grid container>

            <Grid item xs={6}>
                <Typography>No. productos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>3 items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{`$${155.1}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{`$${35.3}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography variant="subtitle1">{`$${187.00}`}</Typography>
            </Grid>

        </Grid>
     );
}
