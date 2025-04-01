import React from "react";
import { APP_INFO, ICONS } from "../utils/constants/app-info.constant";

interface ListingsProps {
  //   listings: interfaces.Listing[];
}

const listings = [
  {
    listingId: 1,
    title: "255 Stewart - Plan C",
    price: 1529,
    bedroomCount: 0, // Studio, no separate bedroom
    bathroomCount: 1,
    availableFrom: "Apr 30, 2025",
    checkAvailability: true,
    availableUnits: 2,
    hasParking: true,
    hasDishwasher: true,
    hasLaundry: true,
    isAccessible: true,
    duration: "1 Month",
    maxNumberOfTenants: 1,
    yearBuilt: 2011,
    avgAreaCost: 1529,
    nearbyListings: null,
    image:`${APP_INFO.IMG_BASE_URL}/images/envoy_plan_c.jpg`
  },
  {
    listingId: 2,
    title: "255 Stewart - Plan B",
    price: 1899,
    bedroomCount: 1,
    bathroomCount: 1,
    availableFrom: "Apr 30, 2025",
    checkAvailability: true,
    availableUnits: 2,
    hasParking: true,
    hasDishwasher: true,
    hasLaundry: true,
    isAccessible: true,
    duration: "1 Month",
    maxNumberOfTenants: 1,
    yearBuilt: 2011,
    avgAreaCost: 1899,
    nearbyListings: null,  
      image:`${APP_INFO.IMG_BASE_URL}/images/envoy_plan_b.jpg`

  },
  {
    listingId: 3,
    title: "255 Stewart - Plan A",
    price: 2499,
    bedroomCount: 2,
    bathroomCount: 1,
    availableFrom: "Apr 30, 2025",
    checkAvailability: true,
    availableUnits: 2,
    hasParking: true,
    hasDishwasher: true,
    hasLaundry: true,
    isAccessible: true,
    duration: "1 Month",
    maxNumberOfTenants: 1,
    yearBuilt: 2011,
    avgAreaCost: 2499,
    nearbyListings: null,
    image:null

  },
];

export const Listings: React.FC<ListingsProps> = ({}) => {
  return (
    <div className="mt-6 mx-3 lg:mx-0">
      <h2 className="sr-only">Products purchased</h2>
      {/* BUTTONS */}
      <div className="pb-8 gap-4 flex">
        <button
          // type="submit"
          className="w-[10rem] text-center rounded-xl bg-[#7C221F]  px-3 py-2 text-lg text-white shadow-xs hover:bg-[#B3322F] "
        >
          All (3)
        </button>
        {/* <button
          // type="submit"
          className="w-[10rem] text-center rounded-xl border border-[#7C221F]  px-3 py-2 text-lg text-[#7C221F] shadow-xs hover:bg-[#7C221F] hover:text-white"
        >
          1B (4)
        </button>
        <button
          // type="submit"
          className="w-[10rem] text-center rounded-xl border outline-[#7C221F]  px-3 py-2 text-lg text-[#7C221F] shadow-xs hover:bg-[#7C221F] hover:text-white "
        >
          2B (6)
        </button> */}
      </div>
      {/* CLV Detilas */}
      <div className=" sm:flex mb-6 justify-between items-center">
        <div>
          <img
            alt="Your Company"
            src={APP_INFO.CLV_LOGO_BLUE}
            className="h-15 w-auto"
          />
          <h1 className="text-xl font-bold ">The Envoy</h1>
          <h2>255 Stewart Street Ottawa, ON</h2>
        </div>
        <div className="i">
          <button
            // type="submit"
            className="flex w-[40%] mx-auto mt-5 sm:mx-0 sm:mt-0 lg:w-full items-center justify-center rounded-full bg-[#7C221F]  px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Contact Agent
          </button>
        </div>
      </div>
      {/* CLV Detilas */}
      <div className="space-y-8">
        {listings.map((listing) => (
          <div
            key={listing.listingId}
            className="border  border-black bg-white shadow-sm shadow-white rounded-lg sm:border p-4"
          >
            <div className="relative isolate flex flex-col gap-8 lg:flex-row">
              {/* IMAGE SECTION */}
              <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-110 lg:h-50 lg:shrink-0">
                {/* <img
                  alt=""
                  src={APP_INFO.DEMO}
                  className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                /> */}
                {listing.image && <img
                  alt="No Image"
                  src={listing.image}
                  className="absolute inset-0 size-full rounded-2xl bg-gray-50 "
                />}
                
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
              </div>
              {/* ICONS SECTIONS */}
              <div>
                <h3 className="font-semibold text-2xl">{listing.title}</h3>

                <div className="container mx-auto py-10">
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 ">
                    {/* ITEMS */}
                    <div className="flex items-center ">
                      <img alt="" className="h-15" src={ICONS.BED} />
                      <h3 className="text-lg font-semibold">
                        {listing.bedroomCount} Bed
                      </h3>
                    </div>
                    {/* ITEMS */}
                    {listing.hasParking && (
                      <div className="flex items-center ">
                        <img alt="" className="h-15" src={ICONS.PARKING} />
                        <h3 className="text-lg font-semibold">Parking</h3>
                      </div>
                    )}

                    {/* ITEMS */}
                    {listing.isAccessible && (
                      <div className="flex items-center">
                        <img alt="" className="h-15" src={ICONS.ACCESSIBLE} />
                        <h3 className="text-lg font-semibold">Accessible</h3>
                      </div>
                    )}

                    {/* ITEMS */}
                    <div className="flex items-center">
                      <img alt="" className="h-15" src={ICONS.BATH} />
                      <h3 className="text-lg font-semibold">
                        {listing.bathroomCount} Bath
                      </h3>
                    </div>
                    {/* ITEMS */}
                    {listing.hasLaundry && (
                      <div className="flex items-center">
                        <img alt="" className="h-15" src={ICONS.LAUNDRY} />
                        <h3 className="text-lg font-semibold">Laundry</h3>
                      </div>
                    )}

                    {/* ITEMS */}
                    {listing.hasDishwasher && (
                      <div className="flex items-center">
                        <img alt="" className="h-15" src={ICONS.DISHWASHER} />
                        <h3 className="text-lg font-semibold">Dishwasher</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* DETAILS SECTION */}
            <div className="container px-3 -mt-5">
              <h3 className="font-semibold text-md">Key Details ★ </h3>
              <div className="container pt-3 lg:py-10 py-5 lg:w-[50%] text-[#B3322F]">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 ">
                  {/* ITEMS */}
                  <div className="flex items-center ">
                    <h3 className="text-sm font-semibold">Year Built: </h3>
                    <h3 className="text-sm pl-4">{listing.yearBuilt}</h3>
                  </div>
                  {/* ITEMS */}
                  <div className="flex items-center ">
                    <h3 className="text-sm font-semibold">Avg Area Cost: </h3>
                    <h3 className="text-sm pl-4">${listing.avgAreaCost}</h3>
                  </div>
                  {/* ITEMS */}
                  <div className="flex items-center ">
                    <h3 className="text-sm font-semibold">
                      {" "}
                      Nearby Listings:{" "}
                    </h3>
                    <h3 className="text-sm pl-4">${listing.nearbyListings}</h3>
                  </div>
                </div>
              </div>
              {/*SECTION */}
              <div className="container flex lg:block">
                <div className=" w-[60%] lg:w-[100%] grid grid-cols-1 lg:grid-cols-4 lg:border py-2  lg:px-4 rounded-full border-black">
                  {/* ITEMS */}
                  <h3 className="text-sm font-bold">Duration</h3>
                  {/* ITEMS */}
                  <h3 className="text-sm font-bold"> Max Number of Tenants </h3>
                  {/* ITEMS */}
                  <h3 className="text-sm font-bold">Price </h3>
                  {/* ITEMS */}
                  <div className="flex items-center "></div>
                </div>
                <div className="w-[40%] lg:w-[100%] grid grid-cols-1 lg:grid-cols-4 py-2 px-4 text-[#B3322F]">
                  {/* ITEMS */}
                  <h3 className="text-sm font-semibold">{listing.duration}</h3>
                  {/* ITEMS */}
                  <h3 className="text-sm font-semibold">{listing.maxNumberOfTenants} </h3>
                  {/* ITEMS */}
                  <h3 className="text-sm font-semibold">${listing.price} /month</h3>
                  {/* ITEMS */}
                  <div className="lg:block hidden flex justify-end items-center">
                    {/* <button
                      // type="submit"
                      className="flex w-[60%] md:w-full items-center justify-center rounded-full bg-[#7C221F] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Contact Agent
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="lg:hidden block mt-5">
                {/* <button
                  // type="submit"
                  className="flex w-[40%] lg:w-full items-center justify-center rounded-full bg-[#7C221F]  px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Contact Agent
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
