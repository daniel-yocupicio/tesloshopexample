import {FC} from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IOperation } from '../../interfaces';

interface Props {
    quantity: number;
    onNewQuantity: (operation:  IOperation ) => void;
    maxQuantity: number;
}

export const ItemCounter: FC<Props> = ({quantity, onNewQuantity, maxQuantity}) => {
    return ( 
        <Box display="flex" alignItems={'center'}>
            <IconButton
                disabled={quantity === 1}
                onClick={() => onNewQuantity("REMOVE")}
            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{width: 40, textAlign: 'center'}}>{quantity}</Typography>
            <IconButton
                disabled={quantity === maxQuantity}
                onClick={() => onNewQuantity("ADD")}
            >
                <AddCircleOutline />
            </IconButton>
        </Box>
     );
}
