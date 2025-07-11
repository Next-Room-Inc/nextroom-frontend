import { configureStore } from "@reduxjs/toolkit";
import { ListingServices } from "./services/listing.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthServices } from "./services/auth.service";
import { PromotionsServices } from "./services/promotions.service";
import { OnboardingServices } from "./services/onboarding.service";

export const store = configureStore({
  reducer: {
    [ListingServices.reducerPath]: ListingServices.reducer,
    [AuthServices.reducerPath]: AuthServices.reducer,
    [PromotionsServices.reducerPath]: PromotionsServices.reducer,
    [OnboardingServices.reducerPath]: OnboardingServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ListingServices.middleware)
      .concat(AuthServices.middleware)
      .concat(PromotionsServices.middleware)
      .concat(OnboardingServices.middleware),
});

setupListeners(store.dispatch);
