import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-lg text-orange-500">
          Loading Success Page...
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
