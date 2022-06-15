import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Head from "next/head";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <script src="https://use.fontawesome.com/bbe60cbe12.js"></script>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
