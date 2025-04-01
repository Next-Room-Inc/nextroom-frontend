import { Link } from "react-router-dom";
import { APP_INFO, ROUTES } from "../utils/constants";
import useAuth from "../pages/authentication/Auth";

export default function Header() {
  const { handleLogout, isLoggedIn } = useAuth();


  return (
    <header className="bg-white">
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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <span className="text-sm/6 font-semibold text-[#7C221F]">
            {!isLoggedIn ? (
              <Link to={ROUTES.LOGIN}>
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
}
