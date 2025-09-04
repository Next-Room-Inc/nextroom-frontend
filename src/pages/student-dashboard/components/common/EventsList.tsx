import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FlowSliderComponent } from "./FlowSliderComponent"
import Loader, { LoaderComponent } from "@src/components/Loader"
import EventRegisterationModal from "../../modals/EventRegisterationModal"
import useAuth from "@src/custom-hooks/useAuth"
import { toast } from "react-toastify"
import { useRegisterUserEventMutation } from "@src/redux/services/events.service"
import { EventSignupCompletionModal } from "../../modals/EventSignupCompletionModal"

export const EventCard = ({
    event,
    index,
    selectedEvent,
    setSelectedEvent,
    signMeUp,
    signMeUpClickHandler
}: {
    signMeUp: boolean
    event: any
    index: number
    selectedEvent: number | null
    setSelectedEvent: (i: number | null) => void
    signMeUpClickHandler: () => void
}) => {
    const isOpen = selectedEvent === index

    return (
        <>
            <div
                onClick={() =>
                    isOpen ? setSelectedEvent(null) : setSelectedEvent(index)
                }
                className="my-6 rounded-2xl md:rounded-xl bg-white flex flex-col md:flex-row overflow-hidden cursor-pointer"
            >
                {/* Event image / date */}
                <div
                    className={`md:bg-[url('/assets/img/events/event_1.png')] 
                      bg-[url('/assets/img/events/event_1_mobile.png')] 
                      bg-center bg-cover h-60 md:w-[50%]`}
                >
                    <span className="inline-flex flex-col items-center leading-tight bg-white ml-4 mt-4 px-4 py-2 rounded-md shadow">
                        <span className="text-gray-600 text-xs font-semibold">
                            {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="font-bold text-gray-800 text-xl -mt-1">
                            {new Date(event.eventDate).getDate()}
                        </span>
                    </span>
                </div>

                {/* Event info */}
                <div className="bg-[#B3322F] text-white md:h-60 h-30 md:w-[50%] flex justify-center items-center text-center p-4">
                    <div>
                        <div className="text-2xl md:text-3xl font-bold">{event.title}</div>
                        <div className="text-lg">{event.location}</div>
                    </div>
                </div>
            </div>

            {/* Dropdown details */}
            {isOpen && (
                <AnimatePresence>
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-white shadow-xl rounded-2xl px-5 md:p-10 py-4 text-sm"
                    >
                        <FlowSliderComponent />
                        <h1 className="text-[#B3322F] text-2xl font-bold">
                            {event.title}
                        </h1>
                        <p className="font-semibold mb-3">Hosted By Nextroom</p>
                        <p>
                            <span className="text-[#B3322F] font-bold">Date: </span> {new Date(event.eventDate).toLocaleDateString("en-US", {
                                // weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <p>
                            <span className="text-[#B3322F] font-bold">Time: </span>
                            {event.startTime} – {event.endTime}
                        </p>
                        <p>
                            <span className="text-[#B3322F] font-bold">Location: </span>
                            {event.location}
                        </p>
                        <p>
                            <span className="text-[#B3322F] font-bold">Cost: </span>
                            {event.cost}
                        </p>
                        <p className="mt-3">
                            <span className="text-[#B3322F] font-bold">Description: </span>
                            {event.description}
                        </p>
                        {signMeUp && <motion.button
                            onClick={signMeUpClickHandler}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="hover:bg-black bg-[#B3322F] md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full"
                        >
                            Sign Me Up
                        </motion.button>}
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}

// Reusable Event List
export const EventList = ({ title, events, isLoading, signMeUp, notRecordFound }: { notRecordFound: any, title: string; events: any[]; isLoading: boolean, signMeUp: boolean }) => {
    const { user } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [eventIdForRegister, setEventIdForRegister] = useState<number | null>(null);
    const [signedUpModal, setSignedUpModal] = useState(false);
    const [registerUserEvent, { isLoading: isRegistering }] = useRegisterUserEventMutation();



    const handleRegister = async () => {
        if (!user?.userId) {
            toast.error("You must be logged in to register for an event.");
            return;
        }

        if (!eventIdForRegister) {
            toast.error("No event selected for registration.");
            return;
        }

        try {


            // Unwrap gives direct response or throws error
            await registerUserEvent({ userId: user.userId, eventId: eventIdForRegister }).unwrap();


            toast.success("You have successfully registered for the event!");

            setEventIdForRegister(null);
            setSignedUpModal(true);
        } catch (err: any) {
            console.error("registerUserEvent error:", err);

            const errorMessage = err?.data || err?.message || "Failed to register for the event.";
            toast.error(errorMessage);
        }
    };



    return (
        <div>
            {(isRegistering) && <Loader />}
            {eventIdForRegister && <EventRegisterationModal {...{ onClose: () => setEventIdForRegister(null), onComplete: handleRegister }} />}
            {signedUpModal && <EventSignupCompletionModal {...{ onClose: () => setSignedUpModal(false), onCancel: () => setSignedUpModal(false) }} />}

            <div className="text-xl font-bold mt-10">
                {title} ({events.length})
            </div>
            {
                isLoading ? <div className="flex items-center justify-center h-50">
                    <LoaderComponent />
                </div> : <>
                    {events.length <= 0 ? <div className="flex items-center justify-center h-20">
                        <h1 className="text-center">{notRecordFound}</h1>
                    </div> : <>{events.map((event, index) => (
                        <EventCard
                            signMeUp={signMeUp}
                            key={index}
                            event={event}
                            index={index}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            signMeUpClickHandler={() => setEventIdForRegister(event.eventId)}
                        />
                    ))}
                    </>}

                </>
            }

        </div >
    )
}