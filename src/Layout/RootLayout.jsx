import { Outlet } from "react-router-dom";

import LenisSmoothScroll from "../Utils/LenisSmoothScroll";

import {PageTransition, Intro , Menu} from "../SharedComponents";



const RootLayout = () => {

  return (
    <>
    {/* <Intro/> */}

      <Menu />
      <PageTransition />

      <div className="">
        <Outlet />
      </div>

      <LenisSmoothScroll />
    </>
  );
};

export default RootLayout;
