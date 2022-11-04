import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UIContext } from '../../context';

export const Navbar = () => {
    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UIContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) {
            return;
        }
        push(`/search/${searchTerm}`);
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems="center" justifyItems="center">
                        <Typography variant="h6">
                            Teslo |
                        </Typography>
                        <Typography
                            sx={{ ml: 0.5 }}
                        >
                            shop
                        </Typography>
                    </Link>
                </NextLink>

                <Box sx={{ flex: 1 }} />

                <Box
                    className="fadeIn"
                    sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                >
                    <NextLink href="/category/men" passHref>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href="/category/women" passHref>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href="/category/kid" passHref>
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box sx={{ flex: 1 }} />

                {
                    isSearchVisible
                        ?
                        (<Input
                            autoFocus
                            value={searchTerm}
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />)
                        :
                        (<IconButton
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            onClick={() => setIsSearchVisible(true)}
                            className="fadeIn"
                        >
                            <SearchOutlined />
                        </IconButton>)
                }

                <IconButton
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
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

                <Button onClick={() => toggleSideMenu()}>Menú</Button>

            </Toolbar>
        </AppBar>
    );
}
