import { configureStore } from "@reduxjs/toolkit";
import UseReducer from "./Features/UserSlice";
import flightReducer from "./Features/FlightSlice";

export const store = configureStore({
  reducer: { users: UseReducer, flights: flightReducer, },
});

