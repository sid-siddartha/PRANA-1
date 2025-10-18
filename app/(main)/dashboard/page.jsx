import { getCollections } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import MoodAnalytics from "./_components/mood-analytics";
import Collections from "./_components/collections";
import Link from "next/link";
import { MessageCircle, Calendar, PenLine } from "lucide-react";

const Dashboard = async () => {
  const collections = await getCollections();
  const entriesData = await getJournalEntries();
  
  // Group entries by collection
  const entriesByCollection = entriesData?.data?.entries?.reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="px-4 py-8 space-y-8 min-h-screen">
      {/* Quick Actions Section */}
      <section className="grid grid-cols-10 gap-4">
        <Link 
          href="/chatbot"
          className="col-span-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="font-semibold text-lg">Chat Bot</span>
        </Link>

        <Link 
          href="/counsellors"
          className="col-span-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
        >
          <Calendar className="w-8 h-8" />
          <span className="font-semibold text-lg">Book Appointment</span>
        </Link>

        <Link 
          href="/journal/write"
          className="col-span-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
        >
          <PenLine className="w-8 h-8" />
          <span className="font-semibold text-lg">How Was Your Day?</span>
        </Link>
      </section>

      {/* Analytics Section */}
      <section className="space-y-4">
        <MoodAnalytics />
      </section>

      {/* Collections Section */}
      <section>
        <Collections
          collections={collections}
          entriesByCollection={entriesByCollection}
        />
      </section>
    </div>
  );
};

export default Dashboard;
