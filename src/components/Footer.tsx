import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { APP_INFO, ROUTES } from "../utils/constants";
import { IMAGES } from "../utils/constants/app-info.constant";
import { Link } from "react-router-dom";

const footerNavigation = {
  partners: [
    { name: "Become a Partner", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Advertise", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "List Your Property", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Integrations         ", href: ROUTES.UNDER_CONSTRUCTION },
  ],
  support: [
    { name: "Help & FAQ", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Contact", href: ROUTES.UNDER_CONSTRUCTION }, 
  ],
  company: [
    { name: "About Us", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Services", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Ambassadors", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Affiliate Program", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Blog", href: ROUTES.UNDER_CONSTRUCTION },
    { name: "Saftey", href: ROUTES.UNDER_CONSTRUCTION },
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
    {
      name: "Tiktok",
      href: APP_INFO.TIKTOK,
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg {...props} viewBox="0 0 41 44" fill="none">
          <g filter="url(#filter0_d_28_713)">
            <path
              d="M27.2366 0.549241C28.5618 3.91544 32.2234 7.75346 36.0524 7.66896L34.9784 13.7112C34.5878 13.9929 31.4423 12.7605 30.7797 12.4577C29.4615 11.8661 28.499 11.0774 27.2436 10.514V24.5774C27.2436 25.6901 25.6394 29.7676 24.928 30.7816C20.9665 36.4788 11.5788 37.169 7.15691 31.683C-0.250051 22.4999 6.59198 11.2183 17.7233 12.2887V18.338C8.43325 16.3239 7.77067 30.0492 16.3354 29.2112C18.4557 29.007 20.8968 26.7676 20.8968 24.5633V0.535156H27.2436L27.2366 0.549241Z"
              fill="white"
            />
            <path
              d="M26.897 1.03516C27.614 2.70372 28.8508 4.43922 30.3755 5.77832C31.8323 7.05772 33.5959 8.00965 35.4585 8.14941L34.5562 13.2266C34.4986 13.2167 34.4329 13.2048 34.3599 13.1885C34.0254 13.1136 33.5941 12.9834 33.1411 12.8301C32.462 12.6002 31.766 12.3303 31.3286 12.1494L30.9878 12.0029L30.9849 12.002L30.5278 11.7822C30.0835 11.5548 29.6709 11.305 29.2476 11.0479C28.6894 10.7089 28.1092 10.354 27.4487 10.0576L26.7437 9.74121V24.5771C26.7437 24.7756 26.6637 25.1764 26.5015 25.7334C26.3448 26.2714 26.1269 26.9041 25.8853 27.5381C25.4553 28.6659 24.9731 29.7391 24.6479 30.291L24.519 30.4941L24.5171 30.4961C22.6374 33.1992 19.4529 34.7353 16.186 34.9268C13.0228 35.1121 9.84244 34.0346 7.74561 31.6084L7.54639 31.3691C3.9639 26.9276 3.85467 22.033 5.92334 18.3877C7.93827 14.8371 12.0546 12.4082 17.2231 12.749V17.7393C15.0598 17.4088 13.3243 17.9088 12.0698 18.915C10.712 20.0042 9.97316 21.6401 9.83545 23.292C9.69788 24.9423 10.1562 26.6571 11.2563 27.9121C12.3698 29.1822 14.0986 29.9326 16.3843 29.709L16.3833 29.708C17.585 29.5922 18.8274 28.9136 19.7622 27.9941C20.6955 27.0762 21.3969 25.8444 21.397 24.5635V1.03516H26.897Z"
              stroke="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_28_713"
              x="0.0649414"
              y="0.535156"
              width="39.9873"
              height="42.9121"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_28_713"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_28_713"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
  ],
};

const Footer = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
  ];
  return (
    <>
      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6  lg:px-8">
        {/* Detail Footer */}
        <div className="  py-10">
          <div className="container mx-auto px-4">
            {/* <!-- Footer grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {/* <!-- Column 4 --> */}
              <div className="lg:col-span-2">
                <img alt="" src={IMAGES.FOOTER} className="" />
                <div className="flex justify-between md:px-20 items-center">
                <img alt="" src={APP_INFO.PRIMARY_LOGO} className="h-15 w-auto" />

                  {/* Languages */}
                  <div className="flex gap-2 text-[#B3322F] font-semibold text-[12px] ">
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
                </div>
              </div>

              {/* <!-- Column 1 --> */}
              <div className="flex flex-col justify-between h-full">
                {/* Content Section - Aligned to the top */}
                <div>
                  <h3 className="text-lg font-bold text-[#B3322F]">
                    Company
                  </h3>
                  <ul role="list" className="mt-4 space-y-1">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-black"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* <!-- Column 2 --> */}
              <div className="flex flex-col justify-between h-full mt-5 md:mt-0">
                {/* Content Section - Aligned to the top */}
                <div>
                  <h3 className="text-lg font-bold text-[#B3322F]">
                   Partners
                  </h3>
                  <ul role="list" className="mt-4 space-y-1">
                    {footerNavigation.partners.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-black"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* <!-- Column 3 --> */}
              <div className="flex flex-col justify-between h-full w-full  ">
                {/* Content Section - Aligned to the top */}
                <div className="mt-5 sm:mt-0">
                  <h3 className="text-lg font-bold text-[#B3322F]">
                    Support
                  </h3>
                  <ul role="list" className="mt-4 space-y-1">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm text-black"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
 
              </div>
            </div>
          </div>
        </div>

        {/* Base Footer */}
        <div className="mt-2 border-t border-[#B3322F] py-4 sm:mt-5 text-center flex flex-col md:flex-row gap-y-4">
          <p className="flex-1">Terms of Service</p>
          <p className="flex-1">Privacy Policy</p>
          <p className=" flex-1">&copy; 2025 {APP_INFO.NAME}</p>
          <p className="flex-1">
            <div className="flex flex-wrap gap-x-2 gap-y-2 w-full md:order-2 justify-center md:justify-right">
              {footerNavigation.social.map((item) => (
                <a
                  target="_blank"
                  key={item.name}
                  href={item.href}
                  className="text-white bg-black p-2 rounded-full"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
