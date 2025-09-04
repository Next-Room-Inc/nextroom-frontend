import { configureStore } from "@reduxjs/toolkit";
import { ListingServices } from "./services/listing.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthServices } from "./services/auth.service";
import { PromotionServices } from "./services/promotions.service";
import { OnboardingServices } from "./services/onboarding.service";
import { PropertyServices } from "./services/property.service";
import { EventsServices } from "./services/events.service";
import { OffersServices } from "./services/offers.service";

export const store = configureStore({
  // reducer
  reducer: {
    [ListingServices.reducerPath]: ListingServices.reducer,
    [AuthServices.reducerPath]: AuthServices.reducer,
    [PromotionServices.reducerPath]: PromotionServices.reducer,
    [OnboardingServices.reducerPath]: OnboardingServices.reducer,
    [PropertyServices.reducerPath]: PropertyServices.reducer,
    [EventsServices.reducerPath]: EventsServices.reducer,
    [OffersServices.reducerPath]: OffersServices.reducer,
  },
  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(OnboardingServices.middleware)
      .concat(ListingServices.middleware)
      .concat(AuthServices.middleware)
      .concat(PromotionServices.middleware)
      .concat(PropertyServices.middleware)
      .concat(OffersServices.middleware)
      .concat(EventsServices.middleware),
});

setupListeners(store.dispatch);
