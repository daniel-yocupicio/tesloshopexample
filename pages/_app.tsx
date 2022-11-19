import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {ThemeProvider, CssBaseline} from '@mui/material';
import {SWRConfig} from 'swr';
import {SessionProvider} from 'next-auth/react';
import { Session } from "next-auth";
import { lightTheme } from '../themes';
import { UIProvider, CartProvider, AuthProvider } from '../context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <PayPalScriptProvider
        options={{'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}}
      >
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
      </PayPalScriptProvider> 
    </SessionProvider>
  );
}

export default MyApp
