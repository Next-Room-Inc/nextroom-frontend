import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import useAuth from "@src/custom-hooks/useAuth";
import OnboardingLayout from "@src/layouts/Onboarding.Layout";
import {
  useGetSubmittedPreferencesByStudentIdQuery,
  useSubmitOnboardingPreferencesMutation,
  useUpdateOnboardingStatusMutation,
} from "@src/redux/services/onboarding.service";
import { ROUTES } from "@src/utils/constants";
import { ICONS } from "@src/utils/constants/app-info.constant";
import * as interfaces from "@src/utils/interfaces";
import {
  ExitConfirmationSection,
  transitionVariants,
} from "./components/CommonComponents";
import LifeStyleSection from "./components/LifeStyleSection";
import PropertySection from "./components/PropertySection";
import RoommateSection from "./components/RoommateSection";
import SituationSection from "./components/SituationSection";

interface AnswerSections {
  PROPERTY_SECTION: Record<string, unknown>;
  LIFE_STYLE_SECTION: Record<string, unknown>;
  ROOMMATES_SECTION: Record<string, unknown>;
  SITUATION_BASED_SECTION: Record<string, unknown>;
}
const sectionsList: (keyof AnswerSections)[] = [
  "PROPERTY_SECTION",
  "LIFE_STYLE_SECTION",
  "ROOMMATES_SECTION",
  "SITUATION_BASED_SECTION",
];

const sections = {
  PROPERTY_SECTION: {
    rentalType: null,
    moveInDate: null,
    stayDurationMonths: null,
    budgetMin: null,
    budgetMax: null,
    campusDistanceKm: null,
    preferredArea: null,
    areaPreferenceType: null,
    accommodationType: null,
    wantsRoommates: null,
    roommateCount: null,
    wantsRoommateMatching: null,

    // UNIT_AMENITIS: null,
    // COMUNITY_AMENITIS: null
  },
  LIFE_STYLE_SECTION: {
    studyArea: null,
    drinkingFrequency: null,
    smokingFrequency: null,
    cannabisFrequency: null,
    tidinessLevel: null,
    goingOutFrequency: null,
    bedtime: null,
    SOCIAL: null,
    STAYING_IN: null,
    CAUSES: null,
    PERSONAL: null,
  },
  ROOMMATES_SECTION: {
    genderComfort: null,
    culturalOpenness: null,
    guestFrequency: null,
    roommateGuestsOk: null,
    weekdayGuestLimit: null,
    studyInUnit: null,
    cookingPlans: null,
    expenseSharing: null,
    friendshipImportance: null,
    communicationFrequency: null,
  },
  SITUATION_BASED_SECTION: {
    impairedRoommate: null,
    lightsOn: null,
    illicitSubstances: null,
    verbalPhysicalAltercation: null,
    loudParties: null,
    owedMoney: null,
  },
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, handleUpdateUser } = useAuth();
  const { studentId = "", firstName = "", lastName = "" } = user || {};
  const [submitOnboardingPreferences] =
    useSubmitOnboardingPreferencesMutation();
  const [updateOnboardingStatus] = useUpdateOnboardingStatusMutation();

  const [loader, setLoader] = useState(false);
  const [exitForm, setExitForm] = useState(false);
  const [section, setSection] =
    useState<keyof AnswerSections>("PROPERTY_SECTION");
  const [formStep, setFormStep] = useState({
    PROPERTY_SECTION: 0,
    LIFE_STYLE_SECTION: 0,
    ROOMMATES_SECTION: 0,
    SITUATION_BASED_SECTION: 0,
  });
  const [answers, setAnswers] = useState<AnswerSections>(sections);
  const [runConfetti, setRunConfetti] = useState(true);

  // const { data: preferncesStatus = [] } = useGetPrefercesStatusQuery(user?.studentId)
  const { data: submittedPreferences = [] } =
    useGetSubmittedPreferencesByStudentIdQuery(studentId);

  //  Using useEffect to Assgin the already answerd questinos :
  useEffect(() => {
    if (!submittedPreferences) return;

    // Destructure and remove unwanted fields before merging
    const {
      customMoveInDate = "",
      customStayDuration = "",
      wantsAdditionalRoommates = "",
      ...cleanedPropertyPreference
    } = submittedPreferences.propertyPreference || {};

    setAnswers((prev) => ({
      PROPERTY_SECTION: {
        ...prev.PROPERTY_SECTION,
        ...cleanedPropertyPreference,
      },
      LIFE_STYLE_SECTION: {
        ...prev.LIFE_STYLE_SECTION,
        ...submittedPreferences.lifestylePreference,
        SOCIAL: submittedPreferences?.socialInterestIds?.length
          ? submittedPreferences?.socialInterestIds
          : null,
        STAYING_IN: submittedPreferences?.stayingInInterestIds?.length
          ? submittedPreferences?.stayingInInterestIds
          : null,
        CAUSES: submittedPreferences?.causesInterestIds?.length
          ? submittedPreferences?.causesInterestIds
          : null,
        PERSONAL: submittedPreferences?.personalInterestIds?.length
          ? submittedPreferences?.personalInterestIds
          : null,
      },
      ROOMMATES_SECTION: {
        ...prev.ROOMMATES_SECTION,
        ...submittedPreferences.roommatePreference,
      },
      SITUATION_BASED_SECTION: {
        ...prev.SITUATION_BASED_SECTION,
        ...submittedPreferences.situationResponse,
      },
    }));
  }, [submittedPreferences, sections]);

  const handleAnswer = (
    section: keyof AnswerSections,
    field: string,
    value: unknown
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    console.log("---<>><><><>", section, field, value);
  };

  const changeStep = async (delta: number) => {
    setFormStep((prev) => ({
      ...prev,
      [section]: Math.max(0, prev[section] + delta),
    }));
  };

  const nextStepHandler = async () => {
    setFormStep((prevState) => ({
      ...prevState,
      [section]: prevState[section] + 1,
    }));
    // const currentIndex = sectionsList.indexOf(section);
    // await submitOnboardingPreferencesHandler(sectionsList[currentIndex])
  };

  const previousStepHandler = () => {
    setFormStep((prevState) => ({
      ...prevState,
      [section]: prevState[section] > 0 ? prevState[section] - 1 : 0,
    }));
  };

  const nextSectionHandler = async () => {
    console.log("hit");
    const currentIndex = sectionsList.indexOf(section);
    const nextIndex = currentIndex + 1;

    console.log(currentIndex, "changingStep :", nextIndex);

    //  saving the records for one section
    await submitOnboardingPreferencesHandler(sectionsList[currentIndex]);

    if (nextIndex < sectionsList.length) {
      setSection(sectionsList[nextIndex]);
    } else {
      navigate(ROUTES.SEARCH_PROPERTY);
    }
  };

  const runConfettiHandler = () =>
    setTimeout(() => {
      setRunConfetti(false);
    }, 10000);

  runConfettiHandler();

  type PreferenceObject = Record<string, any>; // Replace with more specific types if available

  type PayloadType = {
    propertyPreference?: PreferenceObject;
    lifestylePreference?: PreferenceObject;
    roommatePreference?: PreferenceObject;
    situationResponse?: PreferenceObject;
  };

  const submitOnboardingPreferencesHandler = async (
    section: keyof AnswerSections | null = null
  ) => {
    setLoader(true);

    const preparePayload = (payload: PayloadType): PayloadType => {
      const joinArrayFields = (
        obj: PreferenceObject | undefined,
        fields: string[]
      ): void => {
        if (!obj) return;
        fields.forEach((field: string) => {
          if (Array.isArray(obj[field])) {
            obj[field] = obj[field].join(",");
          }
        });
      };

      const normalizeBooleanFields = (
        obj: PreferenceObject | undefined
      ): void => {
        if (!obj) return;
        for (const key in obj) {
          if (obj[key] === "Yes") obj[key] = true;
          else if (obj[key] === "No") obj[key] = false;
        }
      };

      joinArrayFields(payload.propertyPreference, [
        "UNIT_AMENITIS",
        "COMUNITY_AMENITIS",
      ]);
      joinArrayFields(payload.lifestylePreference, [
        "studyArea",
        "SOCIAL",
        "STAYING_IN",
        "CAUSES",
        "PERSONAL",
      ]);

      [
        "propertyPreference",
        "lifestylePreference",
        "roommatePreference",
        "situationResponse",
      ].forEach((key) =>
        normalizeBooleanFields(payload[key as keyof PayloadType])
      );

      return payload;
    };

    let payload: PayloadType = {
      propertyPreference: answers.PROPERTY_SECTION,
      lifestylePreference: answers.LIFE_STYLE_SECTION,
      roommatePreference: answers.ROOMMATES_SECTION,
      situationResponse: answers.SITUATION_BASED_SECTION,
    };

    // Reduce payload to only the selected section if passed
    if (section) {
      const sectionMap: Record<keyof AnswerSections, keyof PayloadType> = {
        PROPERTY_SECTION: "propertyPreference",
        LIFE_STYLE_SECTION: "lifestylePreference",
        ROOMMATES_SECTION: "roommatePreference",
        SITUATION_BASED_SECTION: "situationResponse",
      };

      const selectedKey = sectionMap[section];

      // Keep only the selected section, set others to undefined
      payload = {
        propertyPreference:
          selectedKey === "propertyPreference"
            ? answers.PROPERTY_SECTION
            : undefined,
        lifestylePreference:
          selectedKey === "lifestylePreference"
            ? answers.LIFE_STYLE_SECTION
            : undefined,
        roommatePreference:
          selectedKey === "roommatePreference"
            ? answers.ROOMMATES_SECTION
            : undefined,
        situationResponse:
          selectedKey === "situationResponse"
            ? answers.SITUATION_BASED_SECTION
            : undefined,
        ...(selectedKey === "lifestylePreference"
          ? {
              socialInterestIds: answers.LIFE_STYLE_SECTION.SOCIAL || [],
              stayingInInterestIds: answers.LIFE_STYLE_SECTION.STAYING_IN || [],
              causesInterestIds: answers.LIFE_STYLE_SECTION.CAUSES || [],
              personalInterestIds: answers.LIFE_STYLE_SECTION.PERSONAL || [],
            }
          : {}),
      };
    }

    console.log("answers==>", answers);
    console.log("payload==>", payload);
    payload = preparePayload(payload);
    console.log(section, "payload try==>", payload);

    // Optional logic for clearing partial sections
    // const clearSections: Record<string, (keyof PayloadType)[]> = {
    //     PROPERTY_SECTION: ['lifestylePreference', 'roommatePreference', 'situationResponse'],
    //     LIFE_STYLE_SECTION: ['roommatePreference', 'situationResponse'],
    //     ROOMMATES_SECTION: ['situationResponse']
    // };

    // if (section && clearSections[section]) {
    //     clearSections[section].forEach((key) => {
    //         payload[key] = undefined;
    //     });
    // }

    try {
      const response = await submitOnboardingPreferences({
        studentId,
        dto: payload,
      });
      console.log(
        "🚀 ~ submitOnboardingPreferencesHandler ~ response:",
        response
      );

      if (response?.error) {
        setLoader(false);
        return toast.error(
          "Oops! Please answer all onboarding questions before submitting."
        );
      }
      toast.success("Answers Saved Successfully");
      // await updateOnboardingStatusHandler({ onboardingFormSubmitted: true });
    } catch (err) {
      console.error(
        "🚨 Unexpected error in submitOnboardingPreferencesHandler:",
        err
      );
      toast.error("An unexpected error occurred. Please try again.");
    }

    setLoader(false);
  };

  const updateOnboardingStatusHandler = async (
    payload: interfaces.updateOnboardingStatusPayload
  ) => {
    setLoader(true);
    try {
      const response = await updateOnboardingStatus(payload);

      console.log("🚀 ~ updateOnboardingStatusHandler ~ response:", response);

      if (response?.error) {
        setLoader(false);
        return toast.error(
          (response.error as any)?.data || "Failed to update onboarding status"
        );
      }
      handleUpdateUser(payload);
      toast.success("Onboarding submission updated successfully!");
      // Optionally navigate here
      setLoader(false);
      navigate(ROUTES.SEARCH_PROPERTY);
    } catch (err) {
      console.error(
        "🚨 Unexpected error in updateOnboardingStatusHandler:",
        err
      );
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const payload = {
    submitOnboardingPreferencesHandler,
    updateOnboardingStatusHandler,
    name: `${(firstName || " ") + " " + (lastName || " ")}`,
    setRunConfetti,
    runConfettiHandler,
    answers,
    setAnswers,
    handleAnswer,
    section,
    setSection,
    changeStep,
    formStep,
    nextStepHandler,
    previousStepHandler,
    nextSectionHandler,
  };

  return (
    <>
      {loader && <Loader />}
      <AnimatePresence>
        {/* ReactConfetti */}
        {((section === "PROPERTY_SECTION" &&
          formStep[section] === 0 &&
          runConfetti) ||
          (answers["PROPERTY_SECTION"]?.preferredArea === "Surprise Me" &&
            runConfetti)) && (
          <motion.div
            key="confetti"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <ReactConfetti numberOfPieces={400} />
          </motion.div>
        )}

        {/* Main Layout */}
        <OnboardingLayout>
          {exitForm ? (
            <ExitConfirmationSection setExitForm={setExitForm} />
          ) : (
            <>
              {formStep[section] !== 0 && (
                <FormStepper
                  {...{
                    updateOnboardingStatusHandler,
                    section,
                    answers,
                    setExitForm,
                    setSection,
                    formStep,
                    changeStep,
                  }}
                />
              )}
              {/* <motion.div className="mt-15" variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}> */}
              {section === "PROPERTY_SECTION" && (
                <PropertySection {...payload} />
              )}
              {section === "LIFE_STYLE_SECTION" && (
                <LifeStyleSection {...payload} />
              )}
              {section === "ROOMMATES_SECTION" && (
                <RoommateSection {...payload} />
              )}
              {section === "SITUATION_BASED_SECTION" && (
                <SituationSection {...payload} />
              )}
              {/* </motion.div> */}
            </>
          )}
        </OnboardingLayout>
      </AnimatePresence>
    </>
  );
};

export default Onboarding;

const FormStepper: React.FC<{
  changeStep: (delta: number) => void;
  formStep: Record<string, number>;
  section: keyof AnswerSections;
  answers: AnswerSections;
  setExitForm: (value: boolean) => void;
  setSection: (value: keyof AnswerSections) => void;
  updateOnboardingStatusHandler: (
    payload: interfaces.updateOnboardingStatusPayload
  ) => void;
}> = ({ setSection, section, answers, updateOnboardingStatusHandler }) => {
  const hasAnsweredAnyQuestion = Object.values(answers[section]).some(
    (answer) => answer !== null
  );

  const totalQuestions = (sec: keyof AnswerSections) =>
    Object.keys(answers[sec]).length || 1;
  const totalAnswered = (sec: keyof AnswerSections) =>
    Object.values(answers[sec]).filter((ans) => ans !== null).length;
  const steps = [
    { label: "Property", name: "PROPERTY_SECTION" },
    { label: "Lifestyle", name: "LIFE_STYLE_SECTION" },
    { label: "Roommates", name: "ROOMMATES_SECTION" },
    { label: "Situation-Based", name: "SITUATION_BASED_SECTION" },
  ];
  console.log("answers==>", answers);
  return (
    <>
      <div className="text-center flex items-end gap-3 md:px-30 px-10 mb-10 mt-10">
        {steps.map((step, index) => {
          const progress =
            (totalAnswered(step.name as keyof AnswerSections) /
              totalQuestions(step.name as keyof AnswerSections)) *
            100;
          console.log(
            "===>>>>",
            step,
            totalAnswered(step.name as keyof AnswerSections),
            totalQuestions(step.name as keyof AnswerSections),
            progress
          );
          return (
            <div
              key={step.label + index}
              className={`${
                section === step.name ? "w-[70%]" : "w-[10%]"
              } md:w-[25%] group`}
            >
              <motion.div className="text-black hidden md:block py-1 group-hover:opacity-100 opacity-0 shadow-[#D9D9D9] mb-3 w-max px-6 mx-auto rounded-xl drop-shadow-md shadow-md bg-white">
                {step.label}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="w-full bg-[#D9D9D9] rounded-full h-8 overflow-hidden"
              >
                <motion.div
                  onClick={() => setSection(step.name as keyof AnswerSections)}
                  className="w-full h-full"
                  variants={transitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                >
                  <motion.div
                    className="bg-[#B3322F] rounded-full h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
        {hasAnsweredAnyQuestion && (
          <Popover className="relative">
            <PopoverButton className="focus:outline-none items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              <motion.div
                className="bg-white pt-3 pb-2 px-4 drop-shadow-md shadow-md rounded-full"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  alt="Arrow Down"
                  className="h-3"
                  src={ICONS.ARROW_DOWN_RED}
                />
              </motion.div>
            </PopoverButton>
            <PopoverPanel className="absolute -left-18 md:-left-15 z-10 mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
              <div className="w-max px-3 shrink rounded-xl bg-white py-2 md:py-4 text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                <div className="flex text-xs font-normal items-center justify-center text-[#808080]">
                  <img alt="Save" className="h-7" src={ICONS.SAVE_ICON} />
                  All Answers Saved
                </div>
                {/* <Button onClick={() => setExitForm(true)} className="bg-[#B3322F] px-6 py-2 rounded-full text-white font-normal text-sm mt-2 mb-2"> */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() =>
                    updateOnboardingStatusHandler({
                      onboardingFormSkipped: true,
                    })
                  }
                  className="cursor-pointer bg-[#B3322F] px-6 py-2 rounded-full text-white font-normal text-sm mt-2 mb-2"
                >
                  Start Housing Search Now
                </motion.button>
              </div>
            </PopoverPanel>
          </Popover>
        )}
      </div>
    </>
  );
};
