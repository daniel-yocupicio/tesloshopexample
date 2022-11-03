import NextLink from 'next/link';
import {AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge} from '@mui/material';
import {SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material';
import { useRouter } from 'next/router';

export const Navbar = () => {

    const {asPath} = useRouter();

   return ( 
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems="center" justifyItems="center">
                        <Typography variant="h6">
                            Teslo |
                        </Typography>
                        <Typography
                            sx={{ml: 0.5}}
                        >
                            shop
                        </Typography>
                    </Link>
                </NextLink>

                <Box sx={{flex: 1}} />

                <Box sx={{display: {xs: 'none' , sm: 'block' }}} >
                    <NextLink href="/category/men" passHref>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary':'info'}>Hombres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href="/category/women" passHref>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary':'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href="/category/kid" passHref>
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary':'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box sx={{flex: 1}} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>Menú</Button>

            </Toolbar>
        </AppBar>
    );
}
 