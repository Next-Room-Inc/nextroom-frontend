export interface SubmitOnboardingPreferencesPayload {
    lifestylePreference: Record<string, unknown>;
    propertyPreference: Record<string, unknown>;
    roommatePreference: Record<string, unknown>;
    situationResponse: Record<string, unknown>;
}

export interface updateOnboardingStatusPayload {
  onboardingFormSubmitted?: boolean;
  onboardingFormSkipped?: boolean;
}
