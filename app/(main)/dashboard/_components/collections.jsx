"use client";

import React, { useState, useEffect } from "react";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections = [], entriesByCollection }) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      toast.success(`Collection ${createdCollection.name} created!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdCollection, createCollectionLoading]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  if (collections.length === 0) return <></>;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-600">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
          className="border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
        />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
            className="border border-purple-200 hover:border-purple-400 transition-all"
          />
        )}

        {/* User Collections */}
        {collections?.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection[collection.id] || []}
            className="border border-purple-200 hover:border-purple-400 transition-all"
          />
        ))}

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
