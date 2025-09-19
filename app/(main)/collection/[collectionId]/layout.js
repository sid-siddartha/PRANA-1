import Link from "next/link";
import { Suspense } from "react";


export default function CollectionLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-purple-600 hover:text-orange-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense>{children}</Suspense>
    </div>
  );
}