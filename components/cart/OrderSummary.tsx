import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';

interface Props {
    summary?: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    }
}

export const OrderSummary: FC<Props> = ({ summary }) => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>No. productos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{summary ? summary.numberOfItems : numberOfItems} producto{summary ? summary.numberOfItems : numberOfItems > 1 ? 's' : ''}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{`${currency.format(summary ? summary.subTotal : subTotal)}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.15) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{`${currency.format(summary ? summary.tax : tax)}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography variant="subtitle1">{`${currency.format(summary ? summary.total : total)}`}</Typography>
            </Grid>

        </Grid>
    );
}
