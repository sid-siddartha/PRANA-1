import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, PenLine } from "lucide-react";
import Link from "next/link";

<section className="grid grid-cols-10 gap-4">
    <Link href="/journal/write" className="col-span-6">
    <Button
      variant="outline"
      className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all"
    >
      <PenLine className="w-8 h-8" />
      <span className="font-semibold text-lg">Share Your Day</span>
    </Button>
  </Link>
  <Link href="/chatbot" className="col-span-2">
    <Button
      variant="outline"
      className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="font-semibold text-lg">Chat with Bot</span>
    </Button>
  </Link>

  <Link href="/counsellors" className="col-span-2">
    <Button
      variant="outline"
      className="w-full h-full flex flex-col items-center justify-center gap-3 border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all"
    >
      <Calendar className="w-8 h-8" />
      <span className="font-semibold text-lg">Book Appointment</span>
    </Button>
  </Link>
</section>
