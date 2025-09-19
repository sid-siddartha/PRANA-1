"use client";

import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditButton({ entryId }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(`/journal/write?edit=${entryId}`)}
      className="border-purple-200 text-purple-600 hover:border-purple-400 hover:text-purple-700"
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit
    </Button>
  );
}
