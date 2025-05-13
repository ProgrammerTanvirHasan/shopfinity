import { Suspense } from "react";
import SearchProductClient from "./SearchProductClient";

export default function SearchProductPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-lg text-orange-500">
          Loading Search Page...
        </div>
      }
    >
      <SearchProductClient />
    </Suspense>
  );
}
