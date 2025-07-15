import { configureStore } from "@reduxjs/toolkit";
import { ListingServices } from "./services/listing.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthServices } from "./services/auth.service";
import { PromotionServices } from "./services/promotions.service";
import { OnboardingServices } from "./services/onboarding.service";
import { PropertyServices } from "./services/property.service";

export const store = configureStore({
  reducer: {
    [ListingServices.reducerPath]: ListingServices.reducer,
    [AuthServices.reducerPath]: AuthServices.reducer,
    [PromotionServices.reducerPath]: PromotionServices.reducer,
    [OnboardingServices.reducerPath]: OnboardingServices.reducer,
    [PropertyServices.reducerPath]: PropertyServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(OnboardingServices.middleware)
      .concat(ListingServices.middleware)
      .concat(AuthServices.middleware)
      .concat(PromotionServices.middleware)
      .concat(PropertyServices.middleware),
});

setupListeners(store.dispatch);
