import { Link } from "react-router-dom";
import { APP_INFO } from "../../utils/constants";

export const NotFoundErrorPage = () => {
  return (
    <div
      className="flex items-center justify-center  min-h-[100vh]"
      style={{
        backgroundImage: `url(${APP_INFO.BACKGROUND_3})`,
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundPosition: "center", // Centers the image
      }}
    >
      <div className="text-center">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-postgres text-white sm:text-7xl">
          404 Page not found
        </h1>

        <p className="mt-6 text-pretty text-lg font-medium text-white sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
            to="/"
            className="rounded-md bg-[#7C221F] px-3.5 py-2.5 text-sm font-semibold text-postgres shadow-sm hover:bg-[#B3322F] text-white"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
