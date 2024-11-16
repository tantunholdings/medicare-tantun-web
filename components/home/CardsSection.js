import { CHAT_CARDS } from "@/utils/constants"; 
import Card from "./Card";

export default function CHAT_CARDSSection({ setTrigger }) {
  return (
    <div>
      {/* Carousel for small screens */}
      <div className="block md:hidden">
        <div className="carousel flex overflow-x-scroll snap-x snap-mandatory gap-4 mb-6 scrollbar-hide">
          {CHAT_CARDS.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-64 snap-center">
              <Card
                title={card.title}
                description={card.description}
                onClick={() => setTrigger(card.triggerText)}
                className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid for medium and larger screens */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {CHAT_CARDS.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            onClick={() => setTrigger(card.triggerText)}
            className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition duration-300"
          />
        ))}
      </div>
    </div>
  );
}
