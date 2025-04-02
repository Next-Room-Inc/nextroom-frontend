import {Dialog, DialogBackdrop, DialogPanel, DialogTitle,} from "@headlessui/react";
import {useState} from "react";
import {APP_INFO} from "../utils/constants";

// Define the props for the Modal component
interface ModalProps {
    open: boolean; // `open` is a boolean
    setOpen: (open: boolean) => void; // `setOpen` is a function that takes a boolean and returns void
}

export const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBannerClick = () => setIsModalOpen(true);
    const handleDismiss = () => setIsModalOpen(false);

    return (
        <>
            <Modal open={isModalOpen} setOpen={setIsModalOpen}/>
            <div className="flex items-center gap-x-6 bg-red-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <p className="text-sm/6 text-white cursor-pointer" onClick={handleBannerClick}>
                    <a href="#" className="hover:underline">
                        <strong className="font-semibold">{APP_INFO.WEBSITE}</strong>
                        <svg
                            viewBox="0 0 2 2"
                            aria-hidden="true"
                            className="mx-2 inline size-0.5 fill-current"
                        >
                            <circle r={1} cx={1} cy={1}/>
                        </svg>
                        Join us to get 1.5-month free rent&nbsp;
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </p>
                <div className="flex flex-1 justify-end">
                    <button
                        type="button"
                        onClick={handleDismiss}
                        className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                        aria-label="Dismiss"
                    >
                        <span className="sr-only">Dismiss</span>
                    </button>
                </div>
            </div>
        </>
    );
};

// Add TypeScript types to the Modal component
const Modal = ({open, setOpen}: ModalProps) => {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        style={{
                            backgroundImage: `url(${APP_INFO.BACKGROUND_3})`,
                            backgroundSize: "contain",
                            backgroundPosition: "right",
                        }}
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-red-200 px-6 pt-6 pb-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div style={{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
                            <div>
                                <img
                                    alt="Your Company"
                                    src={APP_INFO.CLV_LOGO_BLUE}
                                    className="h-10 w-auto"
                                />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle
                                    as="h3"
                                    className="text-2xl font-semibold text-white"
                                >
                                    🎉 Exclusive Offer Just for You! 🎉
                                </DialogTitle>
                                <div className="mt-4">
                                    <p className="text-lg text-white">
                                        Get 1 month of rent absolutely FREE!
                                    </p>
                                    <p className="mt-2 text-sm text-gray-100">
                                        Don't miss out on this limited-time offer. Click the button
                                        below to get started.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-4">
                            <a
                                href={`mailto:${APP_INFO.JOIN_US}`}
                                className="inline-flex w-full justify-center rounded-md bg-red-700 px-4 py-3 text-lg font-semibold text-white shadow-lg shadow-red-900 hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                            >
                                Join Us
                            </a>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="mt-4 cursor-pointer inline-flex w-full justify-center rounded-md px-4 py-3 text-lg font-semibold text-black bg-white shadow-lg shadow-red-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 sm:col-start-1 sm:mt-0"
                            >
                                No, Thanks
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};