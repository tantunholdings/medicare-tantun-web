"use client"; // Mark this as a client component

import { useState } from "react";
import Card from "./Card"; // Import the Card component from the new file
import ChatPopup from "./ChatPopup";

export default function AssistanceSection() {
  
  return (
    <section className="mt-8 bg-white p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4">
        How can we assist you today?
      </h2>

      <ChatPopup />
    </section>
  );
}
