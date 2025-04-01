import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { APP_INFO, ROUTES } from "../utils/constants";
import { IMAGES } from "../utils/constants/app-info.constant";
import { Link } from "react-router-dom";

const footerNavigation = {
  solutions: [
    { name: "Marketing", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Analytics", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Automation", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Commerce", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Insights", href: ROUTES.UNDER_CONSTRUCTION },
  ],
  support: [
    { name: "Submit ticket", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Documentation", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Guides", href: ROUTES.UNDER_CONSTRUCTION },
  ],
  company: [
    { name: "About", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Blog", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Jobs", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Press", href: ROUTES.UNDER_CONSTRUCTION },
  ],
  legal: [
    { name: "Terms of service", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Privacy policy", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "License", href: ROUTES.UNDER_CONSTRUCTION },
  ],
  social: [
    {
      name: "Facebook",
      href: APP_INFO.FACEBOOK,
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: APP_INFO.INSTAGRAM,
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 sm:mt-40 lg:px-8">
        {/* Detail Footer */}
        <div className="  py-10">
          <div className="container mx-auto px-4">
            {/* <!-- Footer grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* <!-- Column 1 --> */}
              <div className="flex flex-col justify-between h-full">
                {/* Content Section - Aligned to the top */}
                <div>
                  <h3 className="text-lg font-bold text-[#7C221F]">
                    Our Services
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Section - Aligned to the bottom */}
                <div className="mt-5">
                  <Link
                  to={ROUTES.UNDER_CONSTRUCTION}
                    // type="submit"
                    className="flex w-[60%] items-center justify-center rounded-full bg-[#7C221F]  px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Landlord Login
                  </Link>
                </div>
              </div>

              {/* <!-- Column 2 --> */}
              <div className="flex flex-col justify-between h-full mt-10 md:mt-0">
                {/* Content Section - Aligned to the top */}
                <div>
                  <h3 className="text-lg font-bold text-[#7C221F]">
                    About {APP_INFO.NAME}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Section - Aligned to the bottom */}
                <div className="-mt-4">
                  <a
                    href={`mailto:${APP_INFO.EMAIL}`}
                    className="flex w-[60%] items-center justify-center rounded-full bg-[#7C221F] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F]"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* <!-- Column 3 --> */}
              <div className="flex flex-col justify-between h-full w-full  ">
                {/* Content Section - Aligned to the top */}
                <div className="mt-18 sm:mt-0">
                  <h3 className="text-lg font-bold text-[#7C221F]">
                    Help & Info
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Icons Section - Aligned to the bottom */}
                <div className="flex flex-wrap gap-x-2 gap-y-2 w-full md:order-2 pt-5">
                  {footerNavigation.social.map((item) => (
                    <a
                      target="_blank"
                      key={item.name}
                      href={item.href}
                      className="text-white hover:bg-[#B3322F] bg-[#7C221F] p-2 rounded-full"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon aria-hidden="true" className="size-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* <!-- Column 4 --> */}
              <div className="mt-2 xl:mt-0 flex flex-col justify-end">
                <img
                  alt=""
                  src={IMAGES.FOOTER_BUILDING}
                  className="h-80 w-auto p-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Base Footer */}
        <div className="mt-2 border-t border-gray-900/10 py-4 sm:mt-5 text-center">
          <p className="mt-4 text-sm/6 text-gray-600 md:order-1 md:mt-0">
            &copy; 2025 {APP_INFO.NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
