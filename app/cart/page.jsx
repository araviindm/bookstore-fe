"use client";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import NavBar from "@/components/NavBar";
import DataCard from "@/components/DataCard";
import BackToTopButton from "@/components/BackToTopButton";
import Dialog from "@/components/Dialog";

import store from "@/stores";
import handler from "@/utils/apiHandler";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const fetchCart = useCallback(async () => {
    let apiCall = {
      method: "GET",
      url: `${store.apiUrl}/api/cart/${store._id}`,
    };
    let resp = await handler(apiCall);
    if (resp.status === 200) {
      let data = resp.data;
      setCart(data);
    } else {
      setCart([]);
      console.log("Error fetching cart", resp);
    }
  }, []);

  const onPlaceOrderClick = async () => {
    if (cart.length < 1) return;
    for (let i = 0; i < cart.length; i++) {
      let book_id = cart[i]._id;
      const resp = await store.postOrder(book_id);
      if (resp) {
        let body = {
          cust_id: store._id,
          book_id: book_id,
        };
        const resp = await store.deleteCart(body);
        if (resp) {
          setDialogText("Order placed!!");
          setShowDialog(true);
          setTimeout(() => {
            router.push("/");
          }, 1200);
        } else {
          console.log("Error in placing order", resp.message);
          setDialogText(resp.message);
          setShowDialog(true);
          return;
        }
      } else {
        console.log("Error placing order", resp.message);
        setDialogText(resp.message);
        setShowDialog(true);
        return;
      }
    }
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
    return () => {};
  }, [fetchCart]);
  return (
    <>
      <NavBar />
      <div className="container py-4 mx-auto">
        <div className="flex justify-between">
          <h2 className="mb-2 text-xl font-bold ">Cart</h2>
          <button
            type="submit"
            className="w-40 px-4 py-2 mb-4 text-white rounded bg-sky-500 hover:bg-sky-600"
            onClick={onPlaceOrderClick}
          >
            Place order
          </button>
        </div>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <DataCard
                key={uuidv4()}
                data={item}
                isOrder={false}
                fetchCart={fetchCart}
              />
            ))}

            <BackToTopButton />
          </>
        ) : (
          <div>Cart is empty</div>
        )}
        {showDialog && <Dialog title={dialogText} />}
      </div>
    </>
  );
};

export default Cart;
