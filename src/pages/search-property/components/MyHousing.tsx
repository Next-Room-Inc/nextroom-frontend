import { LoaderComponent } from "@src/components/Loader";
import useAuth from "@src/custom-hooks/useAuth";
import { useGetAcceptedPropertyQuery, useGetSavedPropertiesQuery } from "@src/redux/services/property.service";
import { useState } from "react";
import { PropertyCard } from "../common/PropertyCard";

type Floorplan = {
  id: string | number;
  // add other fields from your backend here
};

// type Property = {
//     id: string | number
//     floorplans?: Floorplan[]
//     // add other fields from your backend here
// }

const MyHousing = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<number | null>(null);

  // API call
  const {
    data: property = null,
    isLoading,
    isError,
  } = useGetAcceptedPropertyQuery(user?.studentId ?? "");
  console.log("===>", property, isLoading, isError);
  return (
    <>
      <div className="py-10 md:mx-15">
        <h1 className="text-xl font-semibold mx-5 mb-5">Accepted Housing</h1>
        {/* Main Property Data */}
        {isLoading && (
          <div className="text-center">
            <LoaderComponent />
            <p className="mt-2">Please wait…</p>
          </div>
        )}

        {/* {isError && (
        <div className="flex items-center justify-center mt-10 gap-4">
          <span className="font-semibold">Failed to fetch data. Retry?</span>
          <motion.div
            onClick={refetch}
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
          </motion.div>
        </div>
      )} */}

        {!isLoading && !property && (
          <div className="text-center bg-white rounded-2xl  py-20">
            <p>No matches found.</p>
          </div>
        )}

        {!isLoading && !isError && property && (
          <div className="grid gap-5 mx-5">
            {property.length && property.floorplans?.map((floorplan: Floorplan, idx: number) => (
              <PropertyCard
                key={`${property.id}-${floorplan.id ?? idx}`} // ✅ stable key
                index={floorplan.id}
                selected={selected === floorplan.id}
                setSelected={setSelected}
                property={property}
                floorplan={floorplan}
                section="my-housing"
              />
            ))}
          </div>
        )}


      </div>
      {/* Saved Units */}
      <SavedUnits />
    </>
  );
};

export default MyHousing;



const SavedUnits = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<number | null>(null);

  // API call
  const {
    data: properties = [null],
    isLoading,
    isError,
  } = useGetSavedPropertiesQuery(user?.studentId ?? "");
  return (
    <div className="py-10 md:mx-15">
      <h1 className="text-xl font-semibold mx-5 mb-5">Saved Units</h1>
      {/* Main Property Data */}
      {isLoading && (
        <div className="text-center">
          <LoaderComponent />
          <p className="mt-2">Please wait…</p>
        </div>
      )}

      {/* {isError && (
        <div className="flex items-center justify-center mt-10 gap-4">
          <span className="font-semibold">Failed to fetch data. Retry?</span>
          <motion.div
            onClick={refetch}
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
          </motion.div>
        </div>
      )} */}

      {!isLoading && !properties.length && (
        <div className="text-center bg-white rounded-2xl  py-20">
          <p>No saved record found.</p>
        </div>
      )}

      {!isLoading && !isError && properties && (
        <div className="grid gap-5 mx-5">
          {properties.length && properties.map((property: any) =>
            property?.floorplans?.map((floorplan: Floorplan, idx: number) => (
              <PropertyCard
                key={`${property.id}-${floorplan.id ?? idx}`} // ✅ stable key
                index={floorplan.id}
                selected={selected === floorplan.id}
                setSelected={setSelected}
                property={property}
                floorplan={floorplan}
                section="my-housing"
                isLightTheme={true}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};