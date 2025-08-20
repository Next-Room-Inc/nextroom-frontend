import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { LoaderComponent } from '@src/components/Loader'
import useAuth from '@src/custom-hooks/useAuth'
import { useGetAcceptedPropertyQuery } from '@src/redux/services/property.service'
import { motion } from "framer-motion"
import { useState } from 'react'
import { PropertyCard } from '../common/PropertyCard'

type Floorplan = {
    id: string | number
    // add other fields from your backend here
}

type Property = {
    id: string | number
    floorplans?: Floorplan[]
    // add other fields from your backend here
}

const MyHousing = () => {
    const { user } = useAuth()
    const [selected, setSelected] = useState<number | null>(null)

    // API call
    const { data: property = null, error, isLoading, isError, refetch } = useGetAcceptedPropertyQuery(user?.studentId ?? "")

    return (
        <div className="py-10 md:mx-15">
            <h1 className='text-xl font-semibold mx-5 mb-5'>Accepted Housing</h1>
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

            {!isLoading && !isError && !property && (
                <div className="text-center">
                    <p>No matches found.</p>
                </div>
            )}

            {!isLoading && !isError && property && (
                <div className="grid gap-5 mx-5">

                    {property.floorplans?.map((floorplan: Floorplan, idx: number) => (
                        <PropertyCard
                            key={`${property.id}-${floorplan.id ?? idx}`} // ✅ stable key
                            index={floorplan.id}
                            selected={selected === floorplan.id}
                            setSelected={setSelected}
                            property={property}
                            floorplan={floorplan}
                            section="my-housing"
                        />
                    ))
                    }
                </div>
            )}
        </div>
    )
}



export default MyHousing