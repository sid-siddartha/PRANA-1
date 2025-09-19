"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserRole } from "@/actions/onboarding";
import { doctorFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";
import useFetch from "@/hooks/use-fetch";

export default function OnboardingPage() {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();

  const { loading, data, fn: submitUserRole } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  const handlePatientSelection = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "PATIENT");
    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      router.push(data.redirect);
    }
  }, [data, router]);

  const onDoctorSubmit = async (data) => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);
    await submitUserRole(formData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 -mt-[50px]">
      <div className="w-full max-w-3xl">
        {/* Role Selection */}
        {step === "choose-role" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="border border-[#4b0f7a]/30 hover:border-[#4b0f7a]/60 shadow-lg cursor-pointer transition-all bg-white/70 backdrop-blur"
              onClick={() => !loading && handlePatientSelection()}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="p-4 bg-gradient-to-r from-[#18063d] to-[#4b0f7a] rounded-full mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-[#18063d] mb-2">
                  Join as a Student
                </CardTitle>
                <CardDescription className="mb-4 text-[#515157]">
                  Book appointments, consult with counsellors, and manage your
                  wellbeing
                </CardDescription>
                <Button
                  className="w-full mt-2 bg-gradient-to-r from-[#18063d] to-[#4b0f7a] hover:opacity-90 text-white"
                  disabled={loading} onClick={()=>{redirect(".")}}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue as Student"
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border border-[#4b0f7a]/30 hover:border-[#4b0f7a]/60 shadow-lg cursor-pointer transition-all bg-white/70 backdrop-blur"
              onClick={() => !loading && setStep("doctor-form")}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="p-4 bg-gradient-to-r from-[#18063d] to-[#4b0f7a] rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-[#18063d] mb-2">
                  Join as a Counsellor
                </CardTitle>
                <CardDescription className="mb-4 text-[#515157]">
                  Create your professional profile, set availability, and help
                  students grow
                </CardDescription>
                <Button
                  className="w-full mt-2 bg-gradient-to-r from-[#18063d] to-[#4b0f7a] hover:opacity-90 text-white"
                  disabled={loading}
                >
                  Continue as Counsellor
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Doctor Form */}
        {step === "doctor-form" && (
          <Card className="border border-[#4b0f7a]/30 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="mb-6 text-center">
                <CardTitle className="text-2xl font-bold text-[#18063d] mb-2">
                  Complete Your Counsellor Profile
                </CardTitle>
                <CardDescription className="text-[#515157]">
                  Provide your professional details for verification
                </CardDescription>
              </div>

              <form onSubmit={handleSubmit(onDoctorSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={specialtyValue}
                    onValueChange={(value) => setValue("specialty", value)}
                  >
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((spec) => (
                        <SelectItem key={spec.name} value={spec.name}>
                          <div className="flex items-center gap-2">
                            <span className="text-[#4b0f7a]">{spec.icon}</span>
                            {spec.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.specialty && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.specialty.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="e.g. 5"
                    {...register("experience", { valueAsNumber: true })}
                  />
                  {errors.experience && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Link to Credential</Label>
                  <Input
                    id="credentialUrl"
                    type="url"
                    placeholder="https://example.com/my-degree.pdf"
                    {...register("credentialUrl")}
                  />
                  {errors.credentialUrl && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.credentialUrl.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Provide a link to your degree or certification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your expertise and services..."
                    rows={4}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("choose-role")}
                    className="border-[#4b0f7a]/40 text-[#18063d]"
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#18063d] to-[#4b0f7a] hover:opacity-90 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit for Verification"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
