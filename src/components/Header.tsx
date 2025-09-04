import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Wave from "react-wavify";
import useAuth from "@src/custom-hooks/useAuth";
import { APP_INFO, ROUTES } from "@src/utils/constants";

export const Header: React.FC<{
  darkMode?: boolean,
  setShowLoginForm?: (value: boolean) => void
}> = ({ darkMode = true, setShowLoginForm = (value: boolean) => { return value } }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudentDashboard = location.pathname === ROUTES.STUDENTS_DASHBOARD;

  const { handleLogout, isLoggedIn } = useAuth();
  // const [selectedLang, setSelectedLang] = useState("en");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerColor, setHeaderColor] = useState("bg-black");

  const StudentDashboardIcons = () => (
    <div className={`${isLoggedIn ? "flex" : "hidden"} gap-2`}>
      <span className="relative inline-block">
        <BellIcon className=" md:text-black md:bg-white text-white bg-black p-1.5 h-7 rounded-full" />
        <span className="absolute top-0 right-0 block size-1.5 rounded-full bg-[#B3322F] ring-2 ring-[#B3322F]  " />
      </span>
      <PhoneIcon className=" md:text-black md:bg-white text-white bg-black p-1.5 h-7 rounded-full" />
      {/* <InformationCircleIcon className=" md:text-white md:bg-black text-black bg-white  h-8.5 -mt-0.5 -ml-1 rounded-full rotate-10" /> */}
      <span className="md:text-black md:bg-white text-white bg-black text-lg   md:text-xl rounded-full h-7.5 w-7.5 text-center">
        𝓲
      </span>
    </div>
  );

  // const languages = [
  //   { code: "en", label: "English" },
  //   { code: "fr", label: "French" },
  // ];

  // your scroll function
  const scrollToForm = () => {
    const element = document.getElementById("loginAndSignupForm");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowLoginForm(true)
  };


  const handleClick = () => {
    if (location.pathname === ROUTES.BASE_PATH) {
      scrollToForm();
    } else {
      setShowLoginForm(true)
      navigate(ROUTES.BASE_PATH);
      // wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToForm();
      }, 300); // small delay to let page render
    }
  };


  const solutions = [
    {
      name: (
        <span onClick={handleClick} className="cursor-pointer">
          Sign Up
        </span>
      ),
      href: "#",
      class: `px-2 md:px-4 ${isLoggedIn ? "hidden" : ""}`,
    },
    {
      name: (
        <span onClick={handleClick} className="cursor-pointer">
          Log In
        </span>
      ),
      href: "#",
      class: `px-2 md:px-4 ${isLoggedIn ? "hidden" : ""}`,
    },
    // {
    //   name: <Link to={ROUTES.SEARCH_PROPERTY}>Search Property</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    // },
    // {
    //   name: <Link to={ROUTES.NEWSROOM}>Newsroom</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4`,
    // },
    // {
    //   name: <Link to={ROUTES.BLOGS}>Blogs</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4`,
    // },
    // {
    //   name: (
    //     <Link to={ROUTES.STUDENT_EXPERIANCE_CENTER}>Experience Centre</Link>
    //   ),
    //   href: "#",
    //   class: `px-2 md:px-4`,
    // },
    // {
    //   name: <Link to={ROUTES.STUDENTS_DASHBOARD}>Student Dashboard</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    // },
    // {
    //   name: <Link to={ROUTES.LANDLORDS_DASHBOARD}>Landlord Dashboard</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    // },
    // {
    //   name: <Link to={ROUTES.ONBOARDING}>Onboarding</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    // },
    // {
    //   name: <Link to={ROUTES.SEARCH_PROPERTY}>Search Property</Link>,
    //   href: "#",
    //   class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    // },
    {
      name: <div onClick={handleLogout}>Log Out</div>,
      href: "#",
      class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : ""}`,
    },
    // {
    //   name: <hr className="text-gray-300 w-full " />,
    //   href: "#",
    //   class: "py-2 md:hidden",
    // },
    { name: <StudentDashboardIcons />, href: "#", class: "px-2 md:hidden" },
    { name: "Refer & Earn", href: "#", class: `px-2 md:px-4  ${!isLoggedIn ? "hidden" : "md:hidden"}`, },
    // { name: "List Your Property", href: "#", class: "px-2 md:hidden" },
    // {
    //   name: (
    //     <>
    //       <div
    //         className={`flex gap-1 font-semibold text-[14px]  ${darkMode ? "text-black" : "text-dark"
    //           }`}
    //       >
    //         {languages.map((lang) => (
    //           <span
    //             key={lang.code}
    //             role="button"
    //             tabIndex={0}
    //             onClick={() => setSelectedLang(lang.code)}
    //             className={` transition duration-200 ${selectedLang === lang.code
    //               ? "underline underline-offset-4 text-red-500"
    //               : "hover:text-red-800"
    //               }`}
    //           >
    //             {lang?.code?.toUpperCase()}
    //           </span>
    //         ))}
    //       </div>
    //     </>
    //   ),
    //   href: "#",
    //   class: "px-2 md:hidden",
    // },
  ];

  const navbar: any[] = [
    // { label: "List Your Property" }
  ];

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }
      if (currentScrollY > 10) {
        setHeaderColor("bg-black/20");
      } else {
        setHeaderColor("bg-black");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
        } ${darkMode ? headerColor : "bg-transparent"}`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between  lg:px-8 pr-4 "
      >
        <div className="flex lg:flex-1">
          <a onClick={() => navigate(ROUTES.BASE_PATH)} className="">
            <span className="sr-only">Nextroom.ca</span>
            <img
              alt=""
              src={APP_INFO.PRIMARY_LOGO}
              className="h-25 w-auto -ml-2 md:ml-0"
            />
          </a>
        </div>

        <div className="mb-4 lg:mb-0 lg:flex lg:flex-1 lg:justify-end">
          {/* Languages */}
          {/* <div
            className={`hidden lg:flex gap-2 font-semibold text-[12px] mt-1 ${darkMode ? "text-white" : "text-dark"
              }`}
          >
            {languages.map((lang) => (
              <span
                key={lang.code}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedLang(lang.code)}
                className={` transition-all duration-300 ease-in-out ${selectedLang === lang.code
                  ? "underline underline-offset-4"
                  : "hover:text-gray-500"
                  }`}
              >
                {lang.label}
              </span>
            ))}
          </div> */}
          <div className=" ml-2 relative hidden lg:inline">
            {/* <div className="absolute right-0 -top-4 rotate-10 bg-[#a53c3588] h-7 w-7 rounded-full font-semibold text-white text-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Wave
                  fill="#A53D35"
                  paused={false}
                  // className="w-full h-full"
                  style={{ height: "100%" }}
                  options={{
                    height: 2,
                    amplitude: 20,
                    speed: 0.2,
                    points: 2,
                  }}
                ></Wave>
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  $
                </p>
              </div>
            </div> */}
            {isLoggedIn && <span
              className={`border-1 px-3 py-1 rounded-full text-[10px] mx-2  transition-all duration-300 ease-in-out ${darkMode
                ? " border-white text-white bg-black"
                : "text-dark border-dark hover:text-white hover:bg-black"
                }`}
            >
              Refer & Earn
            </span>}
          </div>
          <div
            className={`hidden md:flex ${isLoggedIn ? "flex" : "hidden"
              }`}
          >
            <StudentDashboardIcons />
          </div>
          <div className=" hidden lg:inline">
            {navbar.map((i, index) => (
              <span
                key={index}
                className={`${isStudentDashboard ? "hidden" : "flex"
                  } border-1 px-3 py-1 rounded-full text-[10px] mx-2  transition-all duration-300 ease-in-out ${darkMode
                    ? "text-white border-white hover:text-black hover:bg-white"
                    : "text-dark border-dark hover:text-white hover:bg-black"
                  }`}
              >
                {i.label}
              </span>
            ))}
          </div>

          {/* Pop Over Button for dropdown */}
          <Popover className="relative">
            <PopoverButton className="focus:outline-none inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 ">
              <div className=" flex bg-white hover:bg-gray-200 shadow-lg border border-gray-100  py-2 px-7 rounded-full lg:-mt-2 mt-3 ml-2  transition-all duration-300 ease-in-out">
                {/* <img
                  src={`${APP_INFO.IMG_BASE_URL}icons/menu_icon.svg`}
                  className={`h-3.2 bg-white mr-4 my-auto`}
                /> */}
                <Bars3Icon
                  className={`h-10 md:h-6 bg-none text-black mr-3 my-auto`}
                />
                <img
                  src={`${APP_INFO.IMG_BASE_URL}icons/owl_icon.svg`}
                  className={`h-7 bg-[#B3322F] rounded-full p-1 mt-1.5 md:mt-0`}
                />
              </div>
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute  left-14 md:left-13 z-10  mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="w-35 md:w-40 shrink rounded-xl bg-white py-2 md:py-4  text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                {solutions.map((item, index) => (
                  <motion.a
                    key={index}
                    className={`${item.class} block py-0.5 px-3 text-gray-900 `}
                    whileHover={{
                      scale: 1.05,
                      x: 5,
                      color: "#dc2626", // Tailwind's red-600
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {/* <span className="text-sm/6 font-semibold text-[#7C221F]">
            {!isLoggedIn ? (
              <Link to={ROUTES.LOGIN}>
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <span className="" onClick={handleLogout}>
                Logout
              </span>
            )}
          </span> */}
        </div>
      </nav>
    </header>
  );
}
