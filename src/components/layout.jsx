import React from "react";
import { Outlet } from "react-router-dom";
import Bar from "./navBar/Bar";

export default function Layout() {
  return (
    <>
      <Bar/>
        <br/>
        <br/>
        <br/>
      <Outlet />
    </>
  );
}