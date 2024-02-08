// PlantContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const PlantContext = createContext();

export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const storedPlantInfo = JSON.parse(localStorage.getItem("plantInfo"));

  const [plantInfo, setPlantInfo] = useState(storedPlantInfo);

  useEffect(() => {
    // Save to localStorage whenever plantInfo changes
    localStorage.setItem("plantInfo", JSON.stringify(plantInfo));
  }, [plantInfo]);

  const updatePlantInfo = (newPlantInfo) => {
    setPlantInfo(newPlantInfo);
  };

  return (
    <PlantContext.Provider value={{ plantInfo, updatePlantInfo }}>
      {children}
    </PlantContext.Provider>
  );
};
