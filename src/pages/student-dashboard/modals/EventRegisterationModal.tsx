import { PrimaryButton } from '@src/components/Button';
import { ModalOverlay } from '@src/components/ModalOverLay';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const EventRegisterationModal = ({
    onClose,
    onComplete,
}: {
    onClose: () => void
    onComplete: () => void
}) => {
    const [count, setCount] = useState(1)

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

                    className="w-full md:w-60 py-3 text-xs"
                    onClick={onComplete}
                >
                    Register
                </PrimaryButton>
            </div>
        </ModalOverlay>
    )
}

export default EventRegisterationModal