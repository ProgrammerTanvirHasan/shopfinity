"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?email=${email}`
        );
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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: email }),
          }
        );

        if (res.ok) {
          setOrders((prev) => prev.filter((order) => order._id !== id));
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } else {
          const errData = await res.json();
          Swal.fire("Failed!", errData.message || "Delete failed", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  const handlePayment = async () => {
    setPaying(true);

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    if (!stripe) {
      Swal.fire("Stripe Error", "Stripe could not be initialized", "error");
      setPaying(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount, email }),
        }
      );

      const data = await res.json();

      if (data?.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        Swal.fire("Error", "Failed to initialize payment", "error");
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      Swal.fire("Error", "Stripe session failed", "error");
    } finally {
      setPaying(false);
    }
  };

  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.amount || 0),
    0
  );

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Wishlist Product</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className=" text-left">
                <th className="px-4 py-3 border-b border-gray-200">Title</th>
                <th className="px-4 py-3 border-b border-gray-200">Amount</th>
                <th className="px-4 py-3 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className=" hover:shadow hover:shadow-2xl  transition-all duration-150"
                >
                  <td className="px-4 py-2 border-b border-gray-100">
                    {order.title || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-100">
                    ${parseFloat(order.amount || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-100">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      title="Delete item"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total:{" "}
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </p>
            <button
              onClick={handlePayment}
              disabled={paying || totalAmount === 0}
              className={`mt-3 px-6 py-2 rounded-md transition ${
                paying || totalAmount === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {paying ? "Processing..." : `Pay Now`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
