import { createContext } from "react";

export const dashbordStoreProvider = createContext({
    handleDashbordToggle : ()=>{}
});

export const cardDataProvider = createContext({
    cardData :[]
})