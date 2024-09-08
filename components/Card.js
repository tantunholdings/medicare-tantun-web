// components/Card.js
export default function Card({ title, description }) {
    return (
      <div className="border border-green-500 p-4 rounded-md">
        <h3 className="font-semibold text-green-500">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  