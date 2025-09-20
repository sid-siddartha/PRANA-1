import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import { Calendar, ShieldCheck, Stethoscope, User,LayoutDashboard } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { auth } from "@clerk/nextjs/server";



const Header = async () => {
  const user = await checkUser();
  if(user?.role === "STUDENT"){
    await checkAndAllocateCredits(user);
  }

  return (
    <div className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 border-b shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="AI Mental Health Logo"
            height={60}
            width={200}
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-[#6d2699] text-3xl font-extrabold">Prana</h1>
        </Link>

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4 ">
          <SignedIn className="border-[#d07fff] bg-[#eac6ff]">
                        {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center hover:cursor-pointer   gap-2 bg-[#eac6ff]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Doctor Links */}
            {user?.role === "DOCTOR" && (
              <Link href="/counsellor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center hover:cursor-pointer   gap-2 bg-[#eac6ff]"
                >
                  <Stethoscope className="h-4 w-4" />
                  Counsellor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <div>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center hover:cursor-pointer   gap-2 bg-[#eac6ff]"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>              
                <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center hover:cursor-pointer   gap-2 bg-[#eac6ff]"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
              </div>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex  items-center hover:cursor-pointer gap-2 bg-[#eac6ff] animate-bounce"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="hover:cursor-pointer">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Header;
