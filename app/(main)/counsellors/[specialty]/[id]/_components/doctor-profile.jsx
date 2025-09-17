// /app/doctors/[id]/_components/doctor-profile.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Medal,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlotPicker } from "./slot-picker";
import { AppointmentForm } from "./appointment-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DoctorProfile({ doctor, availableDays }) {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();

  // Calculate total available slots
  const totalSlots = availableDays?.reduce(
    (total, day) => total + day.slots.length,
    0
  );

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    if (!showBooking) {
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleSlotSelect = (slot) => setSelectedSlot(slot);

  const handleBookingComplete = () => {
    router.push("/appointments");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left column - Doctor Photo and Quick Info */}
      <div className="md:col-span-1">
        <div className="md:sticky md:top-24">
          <Card className="border-purple-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-purple-100">
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-16 w-16 text-purple-600" />
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Dr. {doctor.name}
                </h2>

                <Badge
                  variant="outline"
                  className="bg-purple-100 border-purple-200 text-purple-600 mb-4"
                >
                  {doctor.specialty}
                </Badge>

                <div className="flex items-center justify-center mb-2">
                  <Medal className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-muted-foreground">
                    {doctor.experience} years experience
                  </span>
                </div>

                <Button
                  onClick={toggleBooking}
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-4 hover:cursor-pointer"
                >
                  {showBooking ? (
                    <>
                      Hide Booking
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right column - Doctor Details */}
      <div className="md:col-span-2 space-y-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              About Dr. {doctor.name}
            </CardTitle>
            <CardDescription>
              Professional background and expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <h3 className="text-gray-900 font-medium">Description</h3>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">
                {doctor.description}
              </p>
            </div>

            <Separator className="bg-purple-200" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <h3 className="text-gray-900 font-medium">Availability</h3>
              </div>
              {totalSlots > 0 ? (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                  <p className="text-muted-foreground">
                    {totalSlots} time slots available for booking over the next
                    4 days
                  </p>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No available slots for the next 4 days. Please check back
                    later.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Booking Section */}
        {showBooking && (
          <div id="booking-section">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Book an Appointment
                </CardTitle>
                <CardDescription>
                  Select a time slot and provide details for your consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {totalSlots > 0 ? (
                  <>
                    {!selectedSlot && (
                      <SlotPicker
                        days={availableDays}
                        onSelectSlot={handleSlotSelect}
                      />
                    )}

                    {selectedSlot && (
                      <AppointmentForm
                        doctorId={doctor.id}
                        slot={selectedSlot}
                        onBack={() => setSelectedSlot(null)}
                        onComplete={handleBookingComplete}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No available slots
                    </h3>
                    <p className="text-muted-foreground">
                      This doctor doesn&apos;t have any available appointment
                      slots for the next 4 days. Please check back later or try
                      another doctor.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
