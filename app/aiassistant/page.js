"use client";

import { useState } from "react";
import CardsSection from "../../components/home/CardsSection";
import ChatPopup from "../../components/home/ChatPopup";

export default function AssistancePage() {
  const [trigger, setTrigger] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Assistant Section */}
      <main className="flex-grow flex justify-center items-center">
        <section
          className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-auto p-6"
          id="chat-section"
        >
          <h2 className="text-2xl font-bold mb-6 text-center underline decoration-blue-500">
            Ask Our MedicareGPT Assistant about Medicare
          </h2>
          <CardsSection setTrigger={setTrigger} />
          <ChatPopup setTrigger={setTrigger} trigger={trigger} />
        </section>
      </main>

      
    </div>
  );
}
