import { useContext, useState } from "react";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';
import { UIContext, AuthContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
    const {isMenuOpen,toggleSideMenu} = useContext(UIContext);
    const {push, asPath} = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const {user, isLoggedIn, logout} = useContext(AuthContext);

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) {
            return;
        }

        navigate(`/search/${searchTerm}`);
    }

    const navigate = (url: any) => {
        toggleSideMenu();
        push(url);
    }

    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={() => toggleSideMenu()}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => onSearchTerm()}
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem 
                                    button 
                                    onClick={() => navigate('/orders/history')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }




                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }} 
                        onClick={()=>navigate('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }} 
                        onClick={()=>navigate('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }} 
                        onClick={()=>navigate('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ni??os'} />
                    </ListItem>

                    {
                        isLoggedIn ? 
                            <ListItem button onClick={logout}>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        :   <ListItem 
                                button
                                onClick={() => navigate(`/auth/login?p=${asPath}`)}
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                    }

                    {
                        user?.role === 'admin' && 
                        (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem 
                                    button
                                    onClick={() => navigate('/admin/')}
                                >
                                    <ListItemIcon>
                                        <DashboardOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <CategoryOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItem>
                                <ListItem 
                                    button
                                    onClick={() => navigate('/admin/orders')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItem>

                                <ListItem   
                                    button
                                    onClick={() => navigate('/admin/users')}
                                >
                                    <ListItemIcon>
                                        <AdminPanelSettings/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItem>       
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}