import { useLocalStore } from "mobx-react";
import React from "react";
import { fetchRestaurants } from "../utils/api";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    selectedFood: "pizza",
    loading: false,
    selectFood: food => (store.selectedFood = food),
    restaurantResults: {},
    getRestaurants: food => {
      if (!store.restaurantResults[food] && !!food) {
        store.loading = true
        fetchRestaurants(food).then(res => {
          store.restaurantResults[food] = res.businesses
          store.loading = false
          console.log(res.businesses)
        });
      }
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
