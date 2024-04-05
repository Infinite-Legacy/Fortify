"use client";

import { useEffect } from "react";
import Header from "@/components/ui/headers/header";

import AOS from "aos";
import "aos/dist/aos.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <main className="grow">
        <Header />

        {children}
      </main>
    </>
  );
}
