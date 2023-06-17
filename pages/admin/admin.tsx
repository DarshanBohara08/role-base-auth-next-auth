import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Admin = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <div>
          <p className="text-center">Welcome to admin page</p>
        </div>
      ) : (
        <div>
          <p className="text-center">Please login as admin to get access</p>
        </div>
      )}
    </>
  );
};

export default Admin;
