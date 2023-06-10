import Image from "next/image";
import { format } from "date-fns";

const OrderCard = ({ order }) => {
  return (
    <div className="flex p-4 my-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <Image
        src={
          order.cover_image_url
            ? order.cover_image_url
            : require("@/assets/book.png")
        }
        width={70}
        height={40}
        alt="Cover Image"
      />
      <div className="mx-4">
        <p className="mb-0.5 text-xl font-bold">{order.title}</p>
        <p className="mb-6 text-sm font-bold capitalize">{order.author}</p>
        <p className="text-xs">Ordered : {format(order.created, "dd-MM-yy")}</p>
      </div>
    </div>
  );
};

export default OrderCard;
