import ChatPopup from "./ChatPopup";

export default function AssistanceSection() {
  return (
    <section className="mt-4 bg-white rounded-lg shadow-sm  max-w-7xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-4">
      Ask our Medicare AI Assistant
      </h2>

      <ChatPopup />
    </section>
  );
}
