"use client";
import { useState } from "react";
import ChatPopup from "./ChatPopup";
import ServicesSection from "./ServicesSection";

export default function AssistanceSection() {
  const [trigger, setTrigger] = useState("");

  return (
    <>
      <ServicesSection setTrigger={setTrigger} />
      <section className="mt-4 bg-white rounded-lg shadow-sm  max-w-7xl mx-auto p-5">
        <h2 className="text-xl font-semibold mb-4">
          Ask our Medicare AI Assistant
        </h2>

        <ChatPopup setTrigger={setTrigger} trigger={trigger} />
      </section>
    </>
  );
}
