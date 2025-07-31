import { CalendarDateRangeIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ModalOverlay } from '../../../components/ModalOverLay'
import { APP_INFO } from '../../../utils/constants'
import { PrimaryButton } from '../../onboarding/components/CommonComponents'

export const UpcomingEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState<null |number>(null)
    type ModalType = 'signup' | 'complete' | 'cancel' | null
    const [activeModal, setActiveModal] = useState<ModalType>(null)




    const events = [
        {
            title: "Nextroom Town Hall",
            location: "Canadian Tire Centre",
            image: "/assets/img/events/event_1.png",
            image_mobile: "/assets/img/events/event_1_mobile.png",
            date: "03-03-2024",
        },
        {
            title: "Nextroom Town Hall",
            location: "Canadian Tire Centre",
            image: "/assets/img/events/event_2.png",
            image_mobile: "/assets/img/events/event_1_mobile.png",

            date: "03-03-2024",
        },
        {
            title: "Nextroom Town Hall",
            location: "Canadian Tire Centre",
            image: "/assets/img/events/event_3.png",
            image_mobile: "/assets/img/events/event_1_mobile.png",

            date: "03-03-2024",
        },
        {
            title: "Nextroom Town Hall",
            location: "Canadian Tire Centre",
            image: "/assets/img/events/event_4.png",
            image_mobile: "/assets/img/events/event_1_mobile.png",

            date: "03-03-2024",
        }
    ]
    return (
        <>
            {/* Signup Modal */}
            {activeModal === 'signup' && (
                <EventSignupModal
                    onClose={() => setActiveModal(null)}
                    onComplete={() => setActiveModal('complete')}
                />
            )}

            {/* Completion Modal */}
            {activeModal === 'complete' && (
                <EventSignupCompletionModal
                    onClose={() => setActiveModal(null)}
                    onCancel={() => setActiveModal('cancel')}
                />
            )}

            {/* Cancellation Modal */}
            {activeModal === 'cancel' && (
                <EventSignupCancelationModal onClose={() => setActiveModal(null)} />
            )}


            <div className='text-xl font-bold'>Upcoming Events ({events.length})</div>
            {/* events */}

            {
                events.map((event, index) =>
                    <>
                        <div
                            onClick={() => selectedEvent === index ? setSelectedEvent(null) : setSelectedEvent(index)}
                            className='my-6 rounded-2xl md:rounded-md bg-white flex flex-col md:flex-row overflow-hidden'>
                            <div className={` md:bg-[url('/assets/img/events/event_1.png')] bg-[url('/assets/img/events/event_1_mobile.png')] bg-center bg-cover h-60 md:w-[50%] `}>
                                <span className="inline-flex flex-col items-center leading-tight  bg-white  ml-4 mt-4 px-4 py-2">
                                    <span className="text-gray-600 text-xs font-semibold">Mar</span>
                                    <span className="font-bold text-gray-800 text-xl -mt-1">03</span>
                                </span>

                            </div>
                            <div className='bg-[#B3322F] text-white md:h-60 h-30 md:w-[50%] flex justify-center items-center text-center'>
                                <div>
                                    <div className='text-2xl md:text-3xl font-bold'>{event.title}</div>
                                    <div className='text-lg'>{event.location}</div>
                                </div>
                            </div>
                        </div>
                        {selectedEvent === index && <div className="">

                            {/* Dropdown */}
                            <AnimatePresence>

                                <motion.div
                                    key="dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="    mt-2   bg-white shadow-xl rounded-2xl px-5 md:p-10 py-4 text-sm"
                                >

                                    <FlowSliderComponent />
                                    <h1 className='text-[#B3322F] text-2xl font-bold'>Nextroom Town Hall</h1>
                                    <p className='font-semibold mb-3'>Hosted By Nextroom</p>
                                    <p><span className='text-[#B3322F] font-bold'>Date: </span>Thursday, August 28 </p>
                                    <p><span className='text-[#B3322F] font-bold'>Time: </span>5:30 PM – 7:30 PM </p>
                                    <p><span className='text-[#B3322F] font-bold'>Location: </span>Canadian Tire Centre</p>
                                    <p><span className='text-[#B3322F] font-bold'>Cost: </span>Free Admission</p>
                                    <p className='mt-3'><span className='text-[#B3322F] font-bold'>Description: </span>This event will feature a live demonstration of the platform, testimonials from local students and landlords, and a Q&A session with the creators of NextRoom.ca. Discover how this simple, secure, and student-focused platform makes it easier than ever to find and rent a home during your studies.</p>
                                    <motion.button
                                        onClick={() => setActiveModal('signup')}
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.03 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                                    >
                                        Sign Me Up
                                    </motion.button>
                                </motion.div>

                            </AnimatePresence>
                        </div>}
                    </>
                )
            }
        </>
    )
}


const slidersList = [
    {
        image: `event_1.png`,
    },
    {
        image: `event_4.png`,
    },
    {
        image: `event_3.png`,
    },
    {
        image: `event_2.png`,
    },
];

export const FlowSliderComponent = () => {
    return (
        <>
            <div className="w-full my-4">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper1"
                >
                    {slidersList.map((feature, index) => (
                        <SwiperSlide key={index}>

                            <div
                                className={`z-10 md:flex  overflow-hidden `}
                            >

                                <img
                                    src={`${APP_INFO.IMG_BASE_URL}events/${feature.image}`}
                                    alt={"title"}
                                    className="w-full h-50  object-cover rounded-2xl"
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </>
    );
};

function EventSignupModal({
    onClose,
    onComplete,
}: {
    onClose: () => void
    onComplete: () => void
}) {
    const [count, setCount] = useState(0)

    const increment = () => setCount((c) => c + 1)
    const decrement = () => setCount((c) => Math.max(c - 1, 0))

    return (
        <ModalOverlay onClose={onClose}>
            <p className="text-center text-sm font-medium text-gray-800">
                How Many Students Will be Attending?
            </p>

            <div className="flex justify-center items-center mt-4 mb-4">
                <div className="flex gap-6 px-10 py-3 bg-white rounded-full shadow-md shadow-[#D9D9D9] drop-shadow-xl">
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="bg-[#B3322F] text-white px-4 pb-1 rounded-full"
                        onClick={decrement}
                    >
                        -
                    </motion.button>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={count}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>

                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="bg-[#B3322F] text-white px-4 pb-1 rounded-full"
                        onClick={increment}
                    >
                        +
                    </motion.button>
                </div>
            </div>

            <textarea
                className="w-full bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing..."
                rows={6}
            />

            <div className="flex justify-center mt-5">
                <PrimaryButton
                    selected 
                    className="w-full md:w-60 py-3 text-xs"
                    onClick={() => {
                        onClose()
                        onComplete()
                    }}
                >
                    Register
                </PrimaryButton>
            </div>
        </ModalOverlay>
    )
}

function EventSignupCompletionModal({
    onClose,
    onCancel,
}: {
    onClose: () => void
    onCancel: () => void
}) {
    return (
        <ModalOverlay onClose={onClose}>
            <CalendarDateRangeIcon className="text-[#B3322F] h-15 mx-auto" />
            <p className="text-center text-lg font-medium text-[#B3322F] mt-2 mb-4">
                You're All Signed Up!
            </p>
            <p className="text-center">
                Thanks for registering — you're now on the guest list! A confirmation
                email has been sent to your inbox with all the event details.
            </p>

            <div className="flex justify-center flex-col md:flex-row mt-6 gap-4">
                <PrimaryButton
                    selected 
                    className="w-full md:w-60 py-3 text-xs"
                    onClick={onClose}
                >
                    Close
                </PrimaryButton>
                <PrimaryButton
                    selected 
                    className="w-full md:w-60 py-3 text-xs"
                    onClick={() => {
                        onClose()
                        onCancel()
                    }}
                >
                    Cancel Registration
                </PrimaryButton>
            </div>
        </ModalOverlay>
    )
}

function EventSignupCancelationModal({
    onClose,
}: {
    onClose: () => void
}) {
    return (
        <ModalOverlay onClose={onClose}>
            <CalendarDateRangeIcon className="text-[#B3322F] h-15 mx-auto" />
            <p className="text-center text-lg font-medium text-[#B3322F] mt-2 mb-4">
                Registration Cancelled
            </p>
            <p className="text-center">
                You’ve been removed from the guest list.
                <br />
                We hope to see you at a future event!
            </p>
            <div className="flex justify-center mt-5">
                <PrimaryButton selected className="w-full md:w-60 py-3 text-xs" onClick={onClose} >
                    Close
                </PrimaryButton>
            </div>
        </ModalOverlay>
    )
}