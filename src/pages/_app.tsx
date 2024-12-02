import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from './layout';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryProvider } from '@/libs/react-query';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </QueryProvider>
  );
}
