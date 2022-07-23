import React from "react";
import type { NextPage } from "next";
import AppHeader from "../components/base/AppHeader";
import AppMain from "../components/base/AppMain";

const Home: NextPage = () => {
  return (
    <>
      <AppHeader />
      <AppMain />
    </>
  );
};

export default Home;
