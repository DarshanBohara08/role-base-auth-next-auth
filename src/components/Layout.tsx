import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { navigation } from "../constant/navgigation";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="bg-gray-600 py-5 text-white flex flex-row justify-between px-32 text-xl">
      <nav className="flex flex-row gap-20">
        {navigation?.map((nav) => {
          return (
            <>
              <Link href={nav.link}>{nav.label}</Link>
            </>
          );
        })}
      </nav>
      <div>
        <button>Login</button>
      </div>
    </header>
    {children}
    <footer className="bg-gray-900 py-20 text-white">
      <p className="text-center">Role base authentication</p>
    </footer>
  </div>
);

export default Layout;
