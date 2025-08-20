import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { LoaderComponent } from '@src/components/Loader'
import useAuth from '@src/custom-hooks/useAuth'
import { useGetPropertyMatchesQuery } from '@src/redux/services/property.service'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { PropertyCard } from '../common/PropertyCard'
import { PrimaryButton } from '@src/components/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@src/utils/constants'
import { FeedbackModal } from '../common/FeedbackModal'
import { ZipLineModal } from '../common/ZipLineModal'
import AdvertismentBanner from '../common/AdvertismentBanner'

type Floorplan = {
    id: string | number
    // add other fields from your backend here
}

type Property = {
    id: string | number
    floorplans?: Floorplan[]
    // add other fields from your backend here
}

const Matches = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [selected, setSelected] = useState<number | null>(null)
    const [feedbackForm, setFeedBackForm] = useState(false);
    const [ziplineModal, setZiplineModal] = useState(false);

    // API call
    const { data: properties = [], error, isLoading, isError, refetch } = useGetPropertyMatchesQuery(user?.studentId ?? "")

    useEffect(() => {
        const feedbackTimeout = setTimeout(() => setFeedBackForm(true), 10000); // 10 seconds
        const ziplineTimeout = setTimeout(() => setZiplineModal(true), 15000); // 15 seconds

        // Cleanup when component unmounts
        return () => { clearTimeout(feedbackTimeout); clearTimeout(ziplineTimeout); };
    }, []);

    return (
        <div className="py-10 ">

            {/* Zip Line away div */}
            <AdvertismentBanner />

            <div className="py-10 md:mx-15">
                {/* Main Property Data */}
                {isLoading && (
                    <div className="text-center">
                        <LoaderComponent />
                        <p className="mt-2">Please wait…</p>
                    </div>
                )}

                {isError && (
                    <div className="flex items-center justify-center mt-10 gap-4">
                        <span className="font-semibold">Failed to fetch data. Retry?</span>
                        <motion.div
                            onClick={refetch}
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                        >
                            <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
                        </motion.div>
                    </div>
                )}

                {!isLoading && !isError && !properties.length && (
                    <div className="text-center">
                        <p>No matches found.</p>
                    </div>
                )}

                {!isLoading && !isError && properties.length > 0 && (
                    <div className="grid gap-5 mx-5">
                        {properties.map((property: Property) =>
                            property.floorplans?.map((floorplan: Floorplan, idx: number) => (
                                <PropertyCard
                                    key={`${property.id}-${floorplan.id ?? idx}`} // ✅ stable key
                                    index={floorplan.id}
                                    selected={selected === floorplan.id}
                                    setSelected={setSelected}
                                    property={property}
                                    floorplan={floorplan}
                                    section="matches"
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
            <div className='flex  justify-center py-10'>
                <PrimaryButton onClick={() => navigate(`${ROUTES.SEARCH_PROPERTY}/explore`)} >
                    I’ll Search On My Own Instead <ArrowRightIcon className=' ml-2 mt-0.5 w-5' />
                </PrimaryButton>
            </div>

            {/* Rating Card Modal */}
            {feedbackForm && <FeedbackModal onClose={() => setFeedBackForm(false)} />}
            {/* Zip Line Modal */}
            {ziplineModal && <ZipLineModal onClose={() => setZiplineModal(false)} />}
        </div>
    )


}

export default Matches