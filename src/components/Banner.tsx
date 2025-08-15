import { toast } from "react-toastify";
import { APP_INFO } from "@src/utils/constants";

interface BannerProps {
  showModalHandler: (name: string, value: boolean) => void,
  submitted: boolean
}

export const Banner: React.FC<BannerProps> = ({ showModalHandler, submitted }) => {
  return (
    <>
      <div
        className={`flex items-center gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ${!submitted ? "bg-red-800" : "bg-green-500"
          }`}
      >
        <p
          className="text-sm/6 text-white cursor-pointer w-full text-center"
          onClick={() => {
            if (!submitted) {
              showModalHandler("rentFree", true);
            } else {
              toast.info(
                "Your request has been sent to company. An agent will get to you very soon"
              );
            }
          }}
        >
          <a href="#" className={!submitted ? `hover:underline` : ""}>
            <strong className="font-semibold">{APP_INFO.WEBSITE}</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline size-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            {submitted
              ? "An agent will get to you very soon"
              : "Enjoy a rent-free summer in Ottawa! (four months free)"}
            &nbsp;
            <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div>
    </>
  );
};
