"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const sessionId = useSearchParams().get("session_id");

  useEffect(() => {
  
    if (status === "authenticated" && sessionId && userEmail) {
      fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to clear cart");
          return res.json();
        })
        .catch((err) => {
          console.error("Error clearing cart:", err);
        });
    }
  }, [status, sessionId, userEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          ✅ Payment Successful!
        </h1>
      </div>
    </div>
  );
}
