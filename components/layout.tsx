import React, { ReactNode } from "react";
import Appbar from "./appbar";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full bg-[#f5f4f6] flex flex-col">
      <Appbar />
      <main className="mx-auto container w-full h-full">{children}</main>
    </div>
  );
}
