"use client";
import { useState } from "react";
import { Banner } from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { HeroSection } from "../../components/HeroSection";
import { Listings } from "../../components/Listings";
import RentFreeModal from "../../components/modals/RentFreeModal";
import SelectCompaniesModal from "../../components/modals/SelectCompaniesModal";

const Home = () => {
  const [showModal, setShowModal] = useState({
    rentFree: false,
    selectCompanies:false
  })

  const showModalHandler = (modal:string, value:boolean) => {
    setShowModal((prev) => ({
      ...prev,
      [modal]: value,
    }));
  };
  
  return (
    <>
      <div className=" h-[100vh]">
        {/* {isLoading && <Loader />} */}
        <Header />
        <Banner {...{showModalHandler,showModal}}/>
        <HeroSection />
        <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-bold tracking-tight text-[#7C221F] sm:text-3xl">
                All Listing
              </h1>
            </div>
          </div>
          {/* {showModal.giveAway && <GiveAwayModal {...{showModalHandler,showModal}}/>} */}
        { showModal.rentFree && <RentFreeModal {...{showModalHandler,showModal}} />}
        { showModal.selectCompanies && <SelectCompaniesModal  {...{showModalHandler,showModal}}/> }

          {/* {error && (
            <div className=" text-center tracking-tight text-red-400 ">
              Error loading listings...
            </div>
          )} */}
          {/* Loader */}
          {/* <Listings {...{ listings }} /> */}
          <Listings />
          {/* <Reviews/> */}
          <Footer />
        </div>
      </div>
     
     
     
    </>
  );
};
export default Home;
