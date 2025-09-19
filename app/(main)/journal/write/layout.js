import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export const metadata = {
  title: "Prana - Journal entry",
  description: "Write your journal entry",
};

export default function WriteLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <PageHeader
        title="How was your day - What's on your mind"
        backLink="/dashboard"
        backLabel="Back to dashboard"
      />
      <Suspense fallback={<BarLoader color="#7C3AED" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
}
