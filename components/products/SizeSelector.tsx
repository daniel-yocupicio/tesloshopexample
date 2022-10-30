import {FC} from 'react';
import {Box, Button} from '@mui/material';
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: ISize
    sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
    return ( 
        <Box>
            {
                sizes.map( (size, i) => (
                    <Button 
                        key={size + i}
                        size="small"
                        color={"inherit"}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
     );
}
 