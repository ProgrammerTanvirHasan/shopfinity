"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cart?email=${email}`);
        const data = await res.json();
        setOrders(data.users || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className="p-4 border rounded-md shadow hover:shadow-lg"
            >
              <p>
                <strong>Name:</strong> {order.title || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {order.amount}
              </p>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
