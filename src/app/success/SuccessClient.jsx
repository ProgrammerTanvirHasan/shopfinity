"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const sessionId = searchParams.get("session_id");

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (email) {
      setMessage(
        `Payment successful! A confirmation has been sent to ${email}`
      );
    } else {
      setMessage("Payment successful! Confirmation email sent.");
    }

    if (sessionId && email) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, userEmail: email }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          return res.json();
        })
        .then((data) => {
          console.log("Cart cleanup response:", data);
        })
        .catch((err) => {
          console.error("Error during cart cleanup:", err);
        });
    }
  }, [email, sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Payment Success!
        </h1>
        <p className="text-gray-700 text-lg">{message}</p>
        <p className="text-sm text-gray-500 mt-4">Session ID: {sessionId}</p>
      </div>
    </div>
  );
};

export default SuccessPage;
