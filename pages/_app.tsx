import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import http from "../utils/http";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => http.get(url).then((response) => response),
        dedupingInterval: 1000 * 60 * 15,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} draggable={false} limit={5} />
    </SWRConfig>
  );
}

export default MyApp;
