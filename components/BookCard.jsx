import Image from "next/image";

const BookCard = ({ book }) => {
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
    </div>
  );
};

export default BookCard;
