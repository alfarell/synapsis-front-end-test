import "@/styles/globals.css";
import type { AppProps } from "next/app";
import BaseLayout from "./layout";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}
