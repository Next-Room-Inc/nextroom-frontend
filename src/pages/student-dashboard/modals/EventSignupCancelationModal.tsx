import { CalendarDateRangeIcon } from "@heroicons/react/20/solid"
import { PrimaryButton } from "@src/components/Button"
import { ModalOverlay } from "@src/components/ModalOverLay"

export function EventSignupCancelationModal({ onClose }: { onClose: () => void }) {
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
                <PrimaryButton className="w-full md:w-60 py-3 text-xs" onClick={onClose} >
                    Close
                </PrimaryButton>
            </div>
        </ModalOverlay>
    )
}