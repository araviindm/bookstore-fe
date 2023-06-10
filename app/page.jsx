"use client";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import store from "@/stores";
const Home = () => {
  useEffect(() => {
    console.log(store);
    return () => {};
  }, []);

  return (
    <>
      <NavBar />
      <div>Home</div>
    </>
  );
};

export default Home;
