"use client";
export const dynamic = "force-dynamic"; 

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SuccessClient = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setMessage("Your transaction was successful!");
    } else if (status === "error") {
      setMessage("Something went wrong, please try again.");
    }
  }, [status]);

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">{message}</h2>
      </div>
    </div>
  );
};

export default SuccessClient;
