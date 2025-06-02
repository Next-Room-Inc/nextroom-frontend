import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import useAuth from "../custom-hooks/useAuth";
import { APP_INFO, ROUTES } from "../utils/constants";
import { Link } from "react-router-dom";

export default function Header({ darkMode = true }) {
  const { handleLogout, isLoggedIn, handleSignupRedirect } = useAuth();
  const [selectedLang, setSelectedLang] = useState("en");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerColor, setHeaderColor] = useState('bg-black');

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
  ];

  const solutions = [
    {
      name: <div onClick={handleSignupRedirect}>Sign Up</div>,
      href: "#",
      class: `px-2 md:px-4 ${isLoggedIn ? "hidden" : ""}`,
    },
    {
      name: <Link to={ROUTES.LOGIN}>Log In</Link>,
      href: "#",
      class: `px-2 md:px-4 ${isLoggedIn ? "hidden" : ""}`,
    },
    {
      name: <div onClick={handleLogout}>Log Out</div>,
      href: "#",
      class: `px-2 md:px-4 ${!isLoggedIn ? "hidden" : ""}`,
    },
    {
      name: <hr className="text-gray-300 w-full " />,
      href: "#",
      class: "py-2 md:hidden",
    },
    { name: "Refer & Earn", href: "#", class: "px-2 md:hidden" },
    { name: "List Your Property", href: "#", class: "px-2 md:hidden" },
    {
      name: (
        <>
          <div
            className={`flex gap-1 font-semibold text-[14px]  ${darkMode ? "text-black" : "text-dark"
              }`}
          >
            {languages.map((lang) => (
              <span
                key={lang.code}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedLang(lang.code)}
                className={`cursor-pointer transition duration-200 ${selectedLang === lang.code
                    ? "underline underline-offset-4 text-red-500"
                    : "hover:text-red-800"
                  }`}
              >
                {lang?.code?.toUpperCase()}
              </span>
            ))}
          </div>
        </>
      ),
      href: "#",
      class: "px-2 md:hidden",
    },
  ];

  const navbar = [{ label: "Refer & Earn" }, { label: "List Your Property" }];

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log()
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }
      if (currentScrollY > 10) {
        setHeaderColor('bg-black/20')
      } else {
        setHeaderColor('bg-black')
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
        } ${darkMode ? headerColor : "bg-transparent"}`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between  lg:px-8 pr-4 "
      >
        <div className="flex lg:flex-1">
          <Link to={ROUTES.BAESPATH}>
            <span className="sr-only">Your Company</span>
            <img alt="" src={APP_INFO.PRIMARY_LOGO} className="h-18 w-auto -ml-2 md:ml-0" />
          </Link>
        </div>

        <div className="mb-4 lg:mb-0 lg:flex lg:flex-1 lg:justify-end">
          {/* Languages */}
          <div
            className={`hidden lg:flex gap-2 font-semibold text-[12px] mt-1 ${darkMode ? "text-white" : "text-dark"
              }`}
          >
            {languages.map((lang) => (
              <span
                key={lang.code}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedLang(lang.code)}
                className={`cursor-pointer transition-all duration-300 ease-in-out ${selectedLang === lang.code
                    ? "underline underline-offset-4"
                    : "hover:text-gray-500"
                  }`}
              >
                {lang.label}
              </span>
            ))}
          </div>
          <div className="ml-2  hidden lg:inline">
            {navbar.map((i, index) => (
              <span
                key={index}
                className={`border-1 px-3 py-1 rounded-full text-[10px] mx-2 cursor-pointer transition-all duration-300 ease-in-out ${darkMode
                    ? "text-white border-white hover:text-black hover:bg-white"
                    : "text-dark border-dark hover:text-white hover:bg-black"
                  }`}
              >
                {i.label}
              </span>
            ))}
          </div>
          <Popover className="relative">
            <PopoverButton className="focus:outline-none inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 ">
              <div className=" flex bg-white hover:bg-gray-200 shadow-lg border border-gray-100  py-2 px-7 rounded-full lg:-mt-2 mt-3 ml-2 cursor-pointer transition-all duration-300 ease-in-out">
                <img
                  src={`${APP_INFO.IMG_BASE_URL}icons/menu_icon.svg`}
                  className={`h-3.2 bg-white mr-4 my-auto`}
                />
                <img
                  src={`${APP_INFO.IMG_BASE_URL}icons/owl_icon.svg`}
                  className={`h-7 bg-[#B3322F] rounded-full p-1`}
                />
              </div>
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute  left-14 md:left-17.5 z-10  mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="w-35 md:w-26 shrink rounded-xl bg-white py-2 md:py-4  text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                {solutions.map((item, index) => (
                  <a
                    key={index}
                    className={item.class + " block py-0.5 hover:text-red-600"}
                  >
                    {item.name}
                  </a>
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
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            )}
          </span> */}
        </div>
      </nav>
    </header>
  );
}
