"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";

export default function DeleteCollectionDialog({
  collection,
  entriesCount = 0,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection);

  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setOpen(false);
      toast.error(
        `Collection "${collection.name}" and all its entries deleted`
      );
      router.push("/dashboard");
    }
  }, [deletedCollection, isDeleting, collection.name, router]);

  const handleDelete = async () => {
    await deleteCollectionFn(collection.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Trash2 className="h-4 w-4 mr-2 text-white" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection.name}&quot;?
          </AlertDialogTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection &quot;{collection.name}&quot;</li>
              <li>
                {entriesCount} journal {entriesCount === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className="font-semibold text-purple-600">
              This action cannot be undone.
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
