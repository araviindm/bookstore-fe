"use client";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import NavBar from "@/components/NavBar";
import OrderCard from "@/components/OrderCard";

import store from "@/stores";
import handler from "@/utils/apiHandler";
import BackToTopButton from "@/components/BackToTopButton";

const Profile = () => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let apiCall = {
        method: "GET",
        url: `${apiUrl}/api/order/${store._id}`,
      };
      let resp = await handler(apiCall);
      if (resp.status === 200) {
        let data = resp.data;
        setOrders(data);
      } else {
        console.log("Error fetching orders", resp);
      }
    };
    fetchOrders();
    return () => {};
  }, [apiUrl]);

  return (
    <>
      <NavBar />
      <div className="container py-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-right capitalize">
          {store.name}
        </h1>
        <h2 className="mb-2 text-xl font-bold ">Purchased Items</h2>
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <OrderCard key={uuidv4()} order={order} />
            ))}
            <BackToTopButton />
          </>
        ) : (
          <div>No Orders found</div>
        )}
      </div>
    </>
  );
};

export default Profile;
