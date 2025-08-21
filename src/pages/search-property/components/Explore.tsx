import { ArrowPathIcon } from "@heroicons/react/20/solid"
import { LoaderComponent } from "@src/components/Loader"
import { useExplorePropertiesQuery } from "@src/redux/services/property.service"
import { Floorplan } from "@src/utils/interfaces"
import { motion } from "framer-motion"
import { useState } from "react"
import { PropertyCard } from "../common/PropertyCard"

const Explore = () => {
    const [selected, setSelected] = useState<number | null>(null)
    const { data: properties = [], isLoading, isError, refetch } = useExplorePropertiesQuery(null)

    return (
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
                    {properties.map((property: any) =>
                        property.floorplans?.map((floorplan: Floorplan, idx: number) => (
                            <PropertyCard
                                key={`${property.id}-${floorplan.id ?? idx}`} // ✅ stable key
                                index={floorplan.id}
                                selected={selected === floorplan.id}
                                setSelected={setSelected}
                                property={property}
                                floorplan={floorplan}
                                section="explore"
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Explore