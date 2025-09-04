import { ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "@src/custom-hooks/useAuth";
// import { ROUTES } from "@src/utils/constants";
// import { LoaderComponent } from "../components/Loader";
// import { toast } from "react-toastify";

export const OnboardingValidation: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user?.onboardingFormSkipped || user?.onboardingFormSubmitted) {
  //     navigate(ROUTES.SEARCH_PROPERTY);
  //     toast.info("Onboarding form already completed. Redirecting to the property search.");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user, navigate]);

  // if (loading) {
  //   return LoaderComponent;
  // }

  return children;
};
