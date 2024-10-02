"use client";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default SessionWrapper;
