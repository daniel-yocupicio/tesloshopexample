import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {ThemeProvider, CssBaseline} from '@mui/material';
import {SWRConfig} from 'swr';
import {SessionProvider} from 'next-auth/react';
import { Session } from "next-auth";
import { lightTheme } from '../themes';
import { UIProvider, CartProvider, AuthProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
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
