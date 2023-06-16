import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { navigation } from "../constant/navgigation";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const route = useRouter();
  return (
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
        <div className="flex flex-row gap-8">
          <button onClick={() => route.push("/login")}>Login</button>
          <button
            onClick={() => {
              signOut({
                callbackUrl: `/`,
              });
            }}
          >
            Logout
          </button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
