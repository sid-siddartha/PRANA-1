import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, PenLine } from "lucide-react";
import Link from "next/link";

const DashboardActions = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      {/* Share Your Day */}
      <Link href="/journal/write" className="sm:col-span-6">
        <Button
          variant="outline"
          className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all py-6"
        >
          <PenLine className="w-8 h-8" />
          <span className="font-semibold text-lg">Share Your Day</span>
        </Button>
      </Link>

      {/* Chat with Bot */}
      <Link href="/chatbot" className="sm:col-span-3">
        <Button
          variant="outline"
          className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all py-6"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="font-semibold text-lg">Chat with Bot</span>
        </Button>
      </Link>

      {/* Book Appointment */}
      <Link href="/counsellors" className="sm:col-span-3">
        <Button
          variant="outline"
          className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all py-6"
        >
          <Calendar className="w-8 h-8" />
          <span className="font-semibold text-lg">Book Appointment</span>
        </Button>
      </Link>
    </section>
  );
};

export default DashboardActions;
