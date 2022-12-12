import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const PriceContext = React.createContext(0);
const PriceUpdate = React.createContext(0);

export function usePrice() {
  return useContext(PriceContext);
}

export function usePriceUpdate() {
  return useContext(PriceUpdate);
}

export function PriceProvider({ children }) {
  const [price, setPrice] = useState(10);

  useEffect(() => {
    setPrice(50);
  }, [price]);

  // THE PROBLEM IS HERE

  function UpdatePrice(val) {
    console.log(val);
    setPrice(val);
  }

  return (
    <PriceContext.Provider value={price}>
      <PriceUpdate.Provider value={UpdatePrice}>
        {children}
      </PriceUpdate.Provider>
    </PriceContext.Provider>
  );
}
