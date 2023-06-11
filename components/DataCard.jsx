import Image from "next/image";
import { format } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import store from "@/stores";

const DataCard = ({ data, isOrder, fetchCart }) => {
  const deleteItemFromCart = async (book_id) => {
    let body = {
      cust_id: store._id,
      book_id: book_id,
    };
    const resp = await store.deleteCart(body);
    if (resp) {
      fetchCart();
    } else {
      console.log("Error removing item", resp.message);
    }
  };
  const handleDeleteClick = () => {
    deleteItemFromCart(data._id);
  };
  return (
    <div className="flex p-4 my-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <Image
        src={
          data.cover_image_url
            ? data.cover_image_url
            : require("@/assets/book.png")
        }
        width={70}
        height={40}
        alt={data.title}
      />
      <div className="mx-4">
        <p className="mb-0.5 text-xl font-bold">{data.title}</p>
        <p className="mb-6 text-sm font-bold capitalize">
          Author: {data.author}
        </p>
        {isOrder ? (
          <p className="text-xs">
            Ordered : {format(data.created, "dd-MM-yy")}
          </p>
        ) : (
          <button className="mx-2" onClick={handleDeleteClick}>
            <AiFillDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default DataCard;
