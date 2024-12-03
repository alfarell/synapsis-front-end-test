import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from './layout';
import { QueryProvider } from '@/libs/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { LoginDialogProvider } from '@/context/LoginDialogContext';
import { PostFormProvider } from '@/context/PostFormContext';

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
