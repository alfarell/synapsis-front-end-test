import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryProvider } from '@/libs/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { LoginDialogProvider } from '@/context/LoginDialogContext';
import { PostFormProvider } from '@/context/PostFormContext';
import BaseLayout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LoginDialogProvider>
          <PostFormProvider>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </PostFormProvider>
        </LoginDialogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
