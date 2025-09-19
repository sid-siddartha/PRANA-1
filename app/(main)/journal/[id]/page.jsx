import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "./_components/delete-dialog";
import EditButton from "./_components/edit-button";
import { getMoodById } from "@/app/lib/mood";
import { getJournalEntry } from "@/actions/journal";

export default async function JournalEntryPage({ params }) {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  const mood = getMoodById(entry.mood);

  return (
    <>
      {/* Header with Mood Image */}
      {entry.moodImageUrl && (
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={entry.moodImageUrl}
            alt="Mood visualization"
            className="object-contain"
            fill
            priority
          />
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-bold gradient-title text-purple-600">
                  {entry.title}
                </h1>
              </div>
              <p className="text-purple-400">
                Created {format(new Date(entry.createdAt), "PPP")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <EditButton entryId={id} />
              <DeleteDialog entryId={id} />
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {entry.collection && (
              <Link href={`/collection/${entry.collection.id}`}>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                  Collection: {entry.collection.name}
                </Badge>
              </Link>
            )}
            <Badge
              variant="outline"
              style={{
                backgroundColor: `var(--purple-50)`,
                color: `var(--purple-700)`,
                borderColor: `var(--purple-200)`,
              }}
            >
              Feeling {mood?.label}
            </Badge>
          </div>
        </div>

        <hr className="border-purple-200" />

        {/* Content Section */}
        <div className="ql-snow">
          <div
            className="ql-editor text-purple-800"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </div>

        {/* Footer */}
        <div className="text-sm text-purple-400 pt-4 border-t border-purple-200">
          Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}
        </div>
      </div>
    </>
  );
}
