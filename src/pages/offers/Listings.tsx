 import { ImageGallery } from "../../components/ImageGallery";
import { APP_INFO, ICONS } from "../../utils/constants/app-info.constant";

const listings = [
    {
      logo: `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/logo.png`,
      address: "211 Rideau St, Ottawa, ON K1N 5Y3",
      listingId: 2,
      title: "Studio",
      price: 1899,
      bedroomCount: 1,
      bathroomCount: 1,
      availableFrom: "Apr 30, 2025",
      checkAvailability: true,
      availableUnits: 2,
      hasParking: false,
      hasDishwasher: true,
      hasLaundry: true,
      isAccessible: false,
      hasGammingRoom: true,
      hasFitnessCenter: true,
      hasBikeStorage: true,
      hasOutDoorPatio: true,
      duration: "3 Years",
      maxNumberOfTenants: 1,
      yearBuilt: 2011,
      avgAreaCost: 2750,
      nearbyListings: 2000,
      image: `${APP_INFO.IMG_BASE_URL}/images/envoy_plan_b.jpg`,
      images: [
        `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/1.png`,
        `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/2.png`,
        `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/3.png`,
        `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/4.png`,
        `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/5.png`,
      ],
    },
    {
      logo: `${APP_INFO.IMG_BASE_URL}/groups/Theo/logo.png`,
      address: "305 Rideau St, Ottawa, ON K1N 9E5",
      listingId: 3,
      title: "Solo",
      price: 2750,
      bedroomCount: 1,
      bathroomCount: 1,
      availableFrom: "Apr 30, 2025",
      checkAvailability: true,
      availableUnits: 2,
      hasParking: false,
      hasDishwasher: true,
      hasLaundry: true,
      isAccessible: false,
      hasGammingRoom: true,
      hasFitnessCenter: true,
      hasBikeStorage: false,
      hasOutDoorPatio: false,
      hasWifi:true,
      hasArtStudio:true,
      hasPentHouseLounge:true,
      hasStudyLounge:true,
      hasFurnishedSuites:true,
      hasAccessControl:true,
      duration: "3 Years",
      maxNumberOfTenants: 1,
      yearBuilt: 2011,
      avgAreaCost: 2750,
      nearbyListings: 2900,
      image: null,
      images: [
        `${APP_INFO.IMG_BASE_URL}/groups/Theo/1.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/Theo/2.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/Theo/3.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/Theo/4.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/Theo/5.jpg`,
      ],
    },
    {
      logo: `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/logo.png`,
      address: "111 Cooper St, Ottawa, ON K2P 2E3",
      listingId: 1,
      title: "2 Bedroom",
      price: 2750,
      bedroomCount: 2, // Studio, no separate bedroom
      bathroomCount: 1,
      availableFrom: "Apr 30, 2025",
      checkAvailability: true,
      availableUnits: 2,
      hasParking: false,
      hasDishwasher: true,
      hasLaundry: true,
      isAccessible: false,
      hasGammingRoom: true,
      hasFitnessCenter: true,
      hasBikeStorage: false,
      hasOutDoorPatio: false,
      duration: "3 Years",
      maxNumberOfTenants: 1,
      yearBuilt: 2011,
      avgAreaCost: 2750,
      nearbyListings: 2900,
      image: `${APP_INFO.IMG_BASE_URL}/images/envoy_plan_c.jpg`,
      images: [
        `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/1.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/2.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/3.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/4.jpg`,
        `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/5.jpg`,
      ],
    },
  ];

  interface ListingsProps {
    showModalHandler:(name:string, value:boolean)=> void
  }

export const Listings: React.FC<ListingsProps>  = ({showModalHandler}) => {
  //   const [auth, setAuth] = useLocalStorage("auth");
  //   const handleJoinOffer = async () => {
  //     await addDoc(collection(db, "marketing"), {
  //       email: auth.email,
  //       firstName: auth.firstName,
  //       lastName: auth.lastName,
  //       name: "CLV group 1.5month offer",
  //       createdAt: new Date(),
  //     });
  //     setAuth((prev: any) => ({
  //       ...prev,
  //       hasAcceptedOffer: true,
  //     }));
  //   };

  return (
    <div className="mt-6 mx-3 lg:mx-0">
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
      {/* <div className=" sm:flex mb-6 justify-between items-center">
        <div>
          <img
            alt="Your Company"
            src={APP_INFO.CLV_LOGO_BLUE}
            className="h-8 pr-2 w-auto"
          />
          <h1 className="text-xl font-bold ">The Envoy</h1>
          <h2>255 Stewart Street Ottawa, ON</h2>
        </div>
        <div className="i">
          <button
            // type="submit"
            onClick={handleJoinOffer}
            className="flex w-[40%] mx-auto mt-5 sm:mx-0 sm:mt-0 lg:w-full items-center justify-center rounded-full bg-[#7C221F]  px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#B3322F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Contact Agent
          </button>
        </div>
      </div> */}

      {listings.map((listing) => (
        <div>
          <div className=" lg:flex  justify-between mt-10 mb-6">
            <div>
            <img
              alt="Your Company"
              src={listing.logo}
              className="h-20 w-auto"
            />
            <h2 className="font-semibold">{listing.address}</h2>
            </div>
            <button
            onClick={()=>  showModalHandler("rentFree",true)}
          // type="submit"
          className=" mt-auto w-[10rem] h-10 text-center rounded-xl bg-[#7C221F]  px-3 py-2 text-lg text-white shadow-xs hover:bg-[#B3322F] "
        >
          Contact us
        </button>
          </div>
          {/* CLV Detilas */}

          <div
            key={listing.listingId}
            className="border space-y-8 border-black bg-white shadow-sm shadow-white rounded-lg sm:border p-4 relative isolate flex flex-col gap-8 lg:flex-row"
          >
            {" "}
            <div className="w-full">
              <div className="relative isolate flex flex-col gap-8 lg:flex-row">
                {/* IMAGE SECTION */}
                <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-110 lg:shrink-0">
                  <ImageGallery images={listing?.images || []} />
                </div>
                {/* ICONS SECTIONS */}
                <div className="w-full">
                  <h3 className="font-semibold text-2xl">{listing.title}</h3>

                  <div className="container mx-auto py-10">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 ">
                      {/* ITEMS */}
                      <div className="flex items-center pb-4 ">
                        <img alt="" className="h-8 pr-2" src={ICONS.BED} />
                        <h3 className="text-md font-semibold">
                          {listing.bedroomCount} Bed
                        </h3>
                      </div>
                      {/* ITEMS */}
                      {listing.hasParking && (
                        <div className="flex items-center  flex-wrap pb-4 ">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.PARKING}
                          />
                          <h3 className="text-md font-semibold">Parking</h3>
                        </div>
                      )}

                      {/* ITEMS */}
                      {listing.isAccessible && (
                        <div className="flex items-center  flex-wrap pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.ACCESSIBLE}
                          />
                          <h3 className="text-md font-semibold">Accessible</h3>
                        </div>
                      )}

                      {/* ITEMS */}
                      <div className="flex items-center   flex-wrap pb-4">
                        <img alt="" className="h-8 pr-2" src={ICONS.BATH} />
                        <h3 className="text-md font-semibold">
                          {listing.bathroomCount} Bath
                        </h3>
                      </div>
                      {/* ITEMS */}
                      {listing.hasLaundry && (
                        <div className="flex items-center  flex-wrap pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.LAUNDRY}
                          />
                          <h3 className="text-md font-semibold">Laundry</h3>
                        </div>
                      )}

                      {/* ITEMS */}
                      {listing.hasDishwasher && (
                        <div className="flex items-center  flex-wrap pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.DISHWASHER}
                          />
                          <h3 className="text-md font-semibold">Dishwasher</h3>
                        </div>
                      )}
                      {/* ITEMS */}
                      {listing.hasOutDoorPatio && (
                        <div className="flex items-center flex-wrap pb-4">
                          <img
                            alt=""
                            className="h-6 pr-2"
                            src={ICONS.OUTDOOR_PATIO}
                          />
                          <h3 className="text-md font-semibold">
                            Outdoor Patio
                          </h3>
                        </div>
                      )}

                      {/* ITEMS */}
                      {listing.hasBikeStorage && (
                        <div className="flex items-center flex-wrap pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.BIKE_STORAGE}
                          />
                          <h3 className="text-md font-semibold">
                            Bike Storage
                          </h3>
                        </div>
                      )}
                      {/* ITEMS */}
                      {listing.hasFitnessCenter && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.FITNESS_CENTER}
                          />
                          <h3 className="text-md font-semibold w-[50%] lg:w-100 ">
                            Fitness Center
                          </h3>
                        </div>
                      )}

                      {/* ITEMS */}
                      {listing.hasGammingRoom && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.GAME_ROOM}
                          />
                          <h3 className="text-md font-semibold">Game Room</h3>
                        </div>
                      )}
                      {listing?.hasWifi && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.WIFI}
                          />
                          <h3 className="text-md font-semibold">Fast Wifi</h3>
                        </div>
                      )}
                      {listing?.hasArtStudio && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.ART_STUDIO}
                          />
                          <h3 className="text-md font-semibold">Art Studio</h3>
                        </div>
                      )}
                      {listing?.hasPentHouseLounge && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.PENT_HOUSE_LOUNGE}
                          />
                          <h3 className="text-md font-semibold">Penthouse Lounge</h3>
                        </div>
                      )}
                      {listing?.hasStudyLounge && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.STUDY_LOUNGE}
                          />
                          <h3 className="text-md font-semibold">Study Lounges
                          </h3>
                        </div>
                      )}
                      {listing?.hasFurnishedSuites && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-8 pr-2"
                            src={ICONS.FURNISHED_SUITES}
                          />
                          <h3 className="text-md font-semibold">Furnished Suites
                          </h3>
                        </div>
                      )}
                      {listing?.hasAccessControl && (
                        <div className="flex items-center pb-4">
                          <img
                            alt=""
                            className="h-10 pr-2"
                            src={ICONS.ACCESS_CONTROL}
                          />
                          <h3 className="text-md font-semibold">Access Control
                          </h3>
                        </div>
                      )}


 
      
      
      
      
      
                    </div>
                  </div>

                  {/* DETAILS SECTION */}
                  <div className="container px-3 -mt-5">
                    {/* <div className=" w-[60%] lg:w-[100%] grid grid-cols-1 lg:border py-2  lg:px-4 rounded-full border-black">
                      <h3 className="font-semibold text-md">Key Details ★ </h3>
                    </div>

                    <div className="container pt-3 lg:py-10 py-5 lg:w-[100%] text-[#B3322F]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                        <div className="flex lg:items-center justify-between">
                          <h3 className="text-sm font-semibold">
                            Year Built:{" "}
                          </h3>
                          <h3 className="text-sm pl-4">{listing.yearBuilt}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold">
                            Avg Area Cost:{" "}
                          </h3>
                          <h3 className="text-sm pl-4">
                            ${listing.avgAreaCost}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold">
                            {" "}
                            Nearby Listings:{" "}
                          </h3>
                          <h3 className="text-sm pl-4">
                            ${listing.nearbyListings}
                          </h3>
                        </div>
                      </div>
                    </div> */}
                    {/*SECTION */}
                    <div className="container flex lg:block">
                      <div className=" w-[60%] lg:w-[100%] grid grid-cols-1 lg:grid-cols-3 lg:border py-2  lg:px-4 rounded-full border-black">
                        {/* ITEMS */}
                        <h3 className="text-sm font-bold">Unit Type(s)</h3>
                        {/* ITEMS */}
                        <h3 className="text-sm font-bold lg:text-center">
                          {" "}
                          Number of Tenants{" "}
                        </h3>
                        {/* ITEMS */}
                        <h3 className="text-sm font-bold lg:text-right">
                          Availability{" "}
                        </h3>
                      </div>
                      <div className="w-[40%] lg:w-[100%] grid grid-cols-1 lg:grid-cols-3 py-2 px-4 text-[#B3322F]">
                        {/* ITEMS */}
                        <h3 className="text-sm font-semibold">
                          {listing.duration}
                        </h3>
                        {/* ITEMS */}
                        <h3 className="text-sm font-semibold lg:text-center">
                          {listing.maxNumberOfTenants}{" "}
                        </h3>
                        {/* ITEMS */}
                        <h3 className="text-sm font-semibold lg:text-right">
                          May 1st, 2025
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
