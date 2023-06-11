"use client";
import { useEffect, useState, useCallback } from "react";

import NavBar from "@/components/NavBar";
import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";
import BackToTopButton from "@/components/BackToTopButton";

import { BsSearch } from "react-icons/bs";

import store from "@/stores";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [bookError, setBookError] = useState("");

  const getBooks = useCallback(async () => {
    let resp = await store.search({ search });
    if (resp.status === 200) {
      setBooks(resp.data);
      setLoading(false);
    } else {
      setBooks([]);
      console.log("Error logging in", resp);
      setBookError(resp.message);
    }
    return () => {};
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setLoading(false);
    getBooks();
  }, [getBooks]);

  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <form
            className="flex items-center justify-center m-2 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search..."
                className="py-2 pl-10 pr-4 border border-gray-300 rounded-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </form>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          {books.length < 1 && <div>No results found</div>}
          <BackToTopButton />
        </>
      )}
    </>
  );
};

export default Home;
