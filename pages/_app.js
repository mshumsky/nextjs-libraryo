import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import {useEffect} from "react";
import {Provider} from "react-redux";
import Layout from "../components/Layout";
import Author from "../entities/Author";
import Book from "../entities/Book";
import StorageMgr from "../libs/StorageMgr";
import store from "../redux";
import {initStorage} from "../redux/actions";
import "../styles/globals.css";





function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const storage = new StorageMgr("library");

    storage.getStack(
      "authors",
      ({ id, first_name, last_name }) => new Author(id, first_name, last_name)
    );

    storage.getStack(
      "books",
      ({ id, title, author_id, created_at, year, image }) =>
        new Book(id, title, author_id, created_at, year, image)
    );

    initStorage(storage)(store.dispatch);
  }, []);

  useEffect(() => {
    document && require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <title>Library Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Share your own books and read others."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
