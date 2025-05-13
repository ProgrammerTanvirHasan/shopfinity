import { Suspense } from "react";
import "../../app/searchProduct/page.jsx";

export default function Page() {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading search...</div>}>
        <searchProduct></searchProduct>
      </Suspense>
    </div>
  );
}
