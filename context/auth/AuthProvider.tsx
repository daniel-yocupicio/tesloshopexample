import {FC,  useEffect,  useReducer} from 'react';
import {AuthContext, authReducer} from './';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import Cookie from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const {data, status} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(status === 'authenticated') {
            //dispatch({type: '[Auth] - Login', payload: data?.user as IUser })
        }
    },[status, data])

    // useEffect(() => {
    //     checkToken();
    // },[])

    const checkToken = async () => {

        if(!Cookie.get('token')) {
            return;
        }

        try {
            const {data} = await tesloApi.get('/user/validatetoken');
            const {token, user} = data;

            Cookie.set('token', token)
            dispatch({type: '[Auth] - Login', payload: user});
        } catch(e){
            Cookie.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const {data} = await tesloApi.post('/user/login',{
                email, password
            });
            const {token, user} = data;

            Cookie.set('token', token)
            dispatch({type: '[Auth] - Login', payload: user});

            return true;
        } catch (e) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean, message?: string}> => {
        try {
            const {data} = await tesloApi.post('/user/login',{
                email, password, name
            });
            const {token, user} = data;

            Cookie.set('token', token)
            dispatch({type: '[Auth] - Login', payload: user});

            return {
                hasError: false
            }

        } catch(e) {
            if(axios.isAxiosError(e)) {
                return {
                    hasError: true,
                    message: e.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario.'
            }
        }
    }

    const logout = () => {
        Cookie.remove('token');
        Cookie.remove('cart');
        Cookie.remove('firstName');
        Cookie.remove('lastName');
        Cookie.remove('address'); 
        Cookie.remove('address2');
        Cookie.remove('zip',);
        Cookie.remove('city',);
        Cookie.remove('country',);
        Cookie.remove('phone',);
        router.reload();
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                loginUser,
                registerUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}