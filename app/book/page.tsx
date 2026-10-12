import type { Metadata } from "next";
import { BookingForm } from "@/components/landing/booking-form";

export const metadata: Metadata = {
  title: "Book a Strategy Call — Yantra Media",
  description: "Tell us about your business and book a website strategy call with the Yantra Media team.",
};

export default function BookPage() {
  return <BookingForm />;
}
