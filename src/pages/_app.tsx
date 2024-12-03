import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from './layout';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryProvider } from '@/libs/react-query';
import { LoginDialogProvider } from '@/context/LoginDialogContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LoginDialogProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </LoginDialogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
