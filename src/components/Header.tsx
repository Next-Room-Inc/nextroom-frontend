import { Link } from "react-router-dom";
import { APP_INFO, ROUTES } from "../utils/constants";
import useAuth from "../custom-hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { handleLogout, isLoggedIn } = useAuth();
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
  ];

  const navbar =[
    {  label: "Refer & Earn" },
    {  label: "List Your Property" }
  ]
  return (
    <header className="bg-[#000000]">
      <nav
        aria-label="Global"
        className="mx-auto lg:flex lg:items-center lg:justify-between  justify-items-center px-6 lg:px-8 "
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={APP_INFO.PRIMARY_LOGO} className="h-24 w-auto" />
          </a>
        </div>

        <div className="mb-4 lg:mb-0 lg:flex lg:flex-1 lg:justify-end hidden">
          {/* Languages */}
          <div className="flex gap-2 text-white font-semibold text-[12px]">
            {languages.map((lang) => (
              <span
                key={lang.code}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedLang(lang.code)}
                className={`cursor-pointer transition duration-200 ${
                  selectedLang === lang.code
                    ? "underline underline-offset-4"
                    : "hover:text-gray-300"
                }`}
              >
                {lang.label}
              </span>
            ))}
          </div>
          <div className="ml-2 -mt-1 hidden md:inline">

          {navbar.map(i=><span className="text-white border-white border-1 px-3 py-1 rounded-full text-[10px] mx-2">{i.label}</span>)}
          </div>

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
