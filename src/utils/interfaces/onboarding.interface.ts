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



export interface Interest {
  interestId: string;
  interestName: string;
}

export interface InterestCategory {
  categoryId: string;
  categoryName: string;
  interests: Interest[];
}

// Example usage
export type StudentInterestsResponse = InterestCategory[];