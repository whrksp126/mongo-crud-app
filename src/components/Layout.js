import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>작업 앱</title>
    </Head>
    <Navbar />
    {children}
  </>
);
