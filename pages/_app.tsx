import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";
import Layout from "@/components/Layout";
// import store from "../store/store";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

// function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default wrapper.withRedux(App)
