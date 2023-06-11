"use client";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import NavBar from "@/components/NavBar";
import DataCard from "@/components/DataCard";

import store from "@/stores";
import handler from "@/utils/apiHandler";
import BackToTopButton from "@/components/BackToTopButton";

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let apiCall = {
        method: "GET",
        url: `${store.apiUrl}/api/order/${store._id}`,
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
  }, []);

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
              <DataCard key={uuidv4()} data={order} isOrder={true} />
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
