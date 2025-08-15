import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SendPromotionEmailPayload } from "@src/utils/interfaces";
import { HeroSection } from "./components/HeroSection";
import { Banner } from "../../components/Banner";
import { Listings } from "./components/Listings";
import Loader from "../../components/Loader";
import RentFreeModal from "../../components/modals/RentFreeModal";
import SelectCompaniesModal from "../../components/modals/SelectCompaniesModal";
import { useSendPromotionEmailMutation } from "@src/redux/services/promotions.service";

const Offers = () => {
  const [sendPromotionEmail, { isLoading }] = useSendPromotionEmailMutation();
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState({
    rentFree: false,
    selectCompanies: false,
  });

  const showModalHandler = (modal: string, value: boolean) => {
    setShowModal((prev) => ({
      ...prev,
      [modal]: value,
    }));
  };

  useEffect(() => {
    showModalHandler("rentFree", true);
  }, []);

  const submitValueHandler = async (
    sendPromotionEmailPayload: SendPromotionEmailPayload
  ) => {
    try {
      const response = await sendPromotionEmail(sendPromotionEmailPayload);
      if (response.error) toast.error("Promotional email requst Failed!");
      else {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 15000);
        toast.success("Request submitted successfully");
        showModalHandler("selectCompanies", false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      {(showModal?.rentFree && false) && (
        <RentFreeModal {...{ showModalHandler, showModal }} />
      )}
      {(showModal?.selectCompanies && false) && (
        <SelectCompaniesModal
          {...{ showModalHandler, showModal, submitValueHandler }}
        />
      )}

      <div className=" h-[100vh]">
        <Header />
        {/* Main Content Starts */}
        <Banner {...{ submitted, showModalHandler }} />
        <HeroSection {...{ showModalHandler }} />
        <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-bold tracking-tight text-[#7C221F] sm:text-3xl">
                All Listing
              </h1>
            </div>
          </div>
        </div>
        {/* Main Content Ends */}
        <div className="mx-auto max-w-2xl   sm:px-6  lg:max-w-7xl lg:px-8">
          <Listings {...{ showModalHandler }} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Offers;
