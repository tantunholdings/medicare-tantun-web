"use client"; // Mark this as a client component

export default function Card({ title, description, onClick, className  }) {
  return (
    <div
      className={`border border-primary p-4 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick(); // Allow "Enter" key to trigger the click for accessibility
      }}
    >
      <h3 className="font-semibold text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
