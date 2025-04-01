import { configureStore } from "@reduxjs/toolkit";
import { ListingServices } from "./services/listing.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthServices } from "./services/auth.service";

export const store = configureStore({
  reducer: {
    [ListingServices.reducerPath]: ListingServices.reducer,
    [AuthServices.reducerPath]: AuthServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ListingServices.middleware).concat(AuthServices.middleware),
});

setupListeners(store.dispatch);