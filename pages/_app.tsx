import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider, CssBaseline} from '@mui/material';
import {SWRConfig} from 'swr';
import { lightTheme } from '../themes';
import { UIProvider, CartProvider, AuthProvider } from '../context';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
            value={{
              fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
          >
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                  <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig> 
    </SessionProvider>
  );
}

export default MyApp
