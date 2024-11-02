'use client';
import React, { createContext, useRef, useContext } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

// Create a context to share the ref
const TawkContext = createContext();

export const TawkProvider = ({ children }) => {
  const tawkMessengerRef = useRef(null);

  return (
    <TawkContext.Provider value={tawkMessengerRef}>
      {children}
      <TawkMessengerReact
        propertyId="67138b002480f5b4f58ff64a"
        widgetId="1iai5dup9"
        ref={tawkMessengerRef}
      />
    </TawkContext.Provider>
  );
};

// Custom hook to use the Tawk ref
export const useTawkMessengerRef = () => {
  return useContext(TawkContext);
};
