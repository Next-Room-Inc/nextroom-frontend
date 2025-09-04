import { CalendarDateRangeIcon } from '@heroicons/react/20/solid';
import { PrimaryButton } from '@src/components/Button';
import { ModalOverlay } from '@src/components/ModalOverLay';


export function EventSignupCompletionModal({
    onClose,
}: {
    onClose: () => void
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

                    className="w-full md:w-60 py-3 text-xs"
                    onClick={onClose}
                >
                    Close
                </PrimaryButton>
                {/* <PrimaryButton

                    className="w-full md:w-60 py-3 text-xs"
                    onClick={() => {
                        onClose()
                        onCancel()
                    }}
                >
                    Cancel Registration
                </PrimaryButton> */}
            </div>
        </ModalOverlay>
    )
}