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
