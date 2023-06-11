import Image from "next/image";
import { useState } from "react";

import Dialog from "./Dialog";
import store from "@/stores";

const BookCard = ({ book }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogText, setDialogText] = useState("Order placed!!");
  const handleBuyClick = async () => {
    const resp = await store.postOrder(book._id);
    if (resp === true) {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 1200);
    } else {
      console.log("Error logging in", resp);
      setDialogText(resp.message);
    }
  };
  return (
    <div className="p-2 m-2 overflow-hidden text-center rounded-lg shadow-lg cursor-pointer dark:bg-gray-800">
      <Image
        alt="Placeholder"
        className="inline-block w-24 h-24"
        src={
          book.cover_image_url
            ? book.cover_image_url
            : require("@/assets/book.png")
        }
      />
      <div className="m-2">
        <p className="text-lg font-bold">{book.title}</p>
        <p className="text-sm capitalize">{book.author}</p>
        <p className="capitalize">₹ {book.price}</p>
      </div>
      <div className="flex items-center justify-around">
        <button className="p-2 border rounded w-28 border-sky-500 hover:bg-sky-200 dark:hover:text-black">
          Add to cart
        </button>
        <button
          className="w-16 p-2 text-white rounded bg-sky-500 hover:bg-sky-600"
          onClick={handleBuyClick}
        >
          Buy
        </button>
      </div>
      {showDialog && <Dialog title={dialogText} />}
    </div>
  );
};

export default BookCard;
