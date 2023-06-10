"use client";
import { useState } from "react";

import NavBar from "@/components/NavBar";
import OrderCard from "@/components/OrderCard";

import { FaGreaterThan, FaLessThan } from "react-icons/fa";

import rootStore from "@/stores";

const Profile = () => {
  const orders = rootStore.orderStore.orders;
  const itemsPerPage = 2; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalBooks = orders.length;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = orders.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavBar />
      <div className="container py-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-right capitalize">
          {rootStore.userStore.name}
        </h1>
        <h2 className="mb-2 text-xl font-bold ">Purchased Items</h2>
        {currentBooks.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaLessThan />
          </button>
          <div className="mx-2">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
