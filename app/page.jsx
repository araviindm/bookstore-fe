"use client";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import rootStore from "@/stores";
const Home = () => {
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     let resp = await rootStore.bookStore.getBooks();
  //     if (resp.status === 200) {
  //     } else {
  //       console.log("Error fetching books", resp);
  //     }
  //   };
  //   fetchBooks();
  //   return () => {
  //     // Perform any necessary clean-up actions
  //   };
  // }, []);

  return (
    <>
      <NavBar />
      <div>Home</div>
    </>
  );
};

export default Home;
