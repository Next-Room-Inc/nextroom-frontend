import Loader, { LoaderComponent } from '@src/components/Loader';
import useAuth from '@src/custom-hooks/useAuth';
import { useCancelUserEventsMutation, useGetAllUserEventsQuery } from '@src/redux/services/events.service';
import { motion } from 'framer-motion';
import { useState } from "react";
import { toast } from 'react-toastify';
import { EventSignupCancelationModal } from "../../modals/EventSignupCancelationModal";
import { EventCard } from '../common/EventsList';

export const Events = () => {
    type ModalType = "cancel" | null;
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const { user } = useAuth()
    const { data: events = [], isLoading } = useGetAllUserEventsQuery(user?.userId ?? null);
    const [cancelUserEvent, { isLoading: isCanceling }] = useCancelUserEventsMutation();

    const cancelUserEventHandler = async (eventId: string): Promise<void> => {
        if (!user?.userId) {
            toast.error("You must be logged in to cancel an event.");
            return;
        }

        try {


            // Using unwrap() to get the actual response or throw an error
            await cancelUserEvent({ userId: user.userId, eventId }).unwrap();


            // toast.success("Successfully cancelled your event registration.");
            setActiveModal('cancel')
        } catch (err: any) {
            console.error("cancelUserEvent error:", err);

            // Graceful error handling with fallback
            const errorMessage =
                err?.data?.message || err?.message || "Failed to cancel the event registration.";
            toast.error(errorMessage);
        }
    };



    return (
        <>
            {isCanceling && <Loader />}

            {/* Cancellation Modal */}
            {activeModal === "cancel" && (
                <EventSignupCancelationModal onClose={() => setActiveModal(null)} />
            )}

            <div className="h-full w-full p-8">
                <h1 className="text-lg font-bold">Your Upcoming Event(s)</h1>

                {isLoading ? (
                    <div className="flex items-center justify-center h-50">
                        <LoaderComponent />
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-10 mt-5">
                        {events.length <= 0 ? <div className="h-50 flex flex-col w-full items-center justify-center text-center text-gray-600">
                            <p className="text-lg font-medium">You haven’t registered for any events yet.</p>
                            <p className="text-sm mt-2">Check out the available events and join one to get started!</p>
                        </div>
                            : events?.map((event: any) => (
                                <div
                                    key={event.eventId}
                                    className="p-5 rounded-2xl flex flex-col justify-between shadow-lg bg-white w-full md:w-[300px]"
                                >

                                    <div>
                                        {/* Event Info */}
                                        <h1 className="text-[#B3322F] font-bold text-xl mb-2">
                                            {event.title}
                                        </h1>
                                        <p className="mb-1">
                                            <span className="text-[#B3322F] font-bold">Date: </span>
                                            {new Date(event.eventDate).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-[#B3322F] font-bold">Time: </span>
                                            {event.startTime} – {event.endTime}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-[#B3322F] font-bold">Location: </span>
                                            {event.location}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-[#B3322F] font-bold">Cost: </span>
                                            {event.cost}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Cancel Registration Button */}
                                        <motion.button

                                            whileTap={{ scale: 0.95 }}
                                            whileHover={{ scale: 1.03 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="hover:bg-black bg-[#B3322F] md:w-[180px] text-center py-1 text-white rounded-full mt-5 w-full"
                                            onClick={() => cancelUserEventHandler(event.eventId)}
                                        >
                                            Cancel Registration
                                        </motion.button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>


    );
};

// Reusable Event List
export const EventList = ({ title, events }: { title: string; events: any[] }) => {
    const [selectedEvent, setSelectedEvent] = useState<null | number>(null)

    return (
        <div>
            <div className="text-xl font-bold">
                {title} ({events.length})
            </div>
            {events.map((event, index) => (
                <EventCard
                    signMeUp={false}
                    key={index}
                    event={event}
                    index={index}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                    signMeUpClickHandler={() => { }}
                />
            ))}
        </div>
    )
}