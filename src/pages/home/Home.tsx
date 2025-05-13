// import { useState, useEffect } from "react";
import { Banner } from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { HeroSection } from "../../components/HeroSection";
// import { Listings } from "../../components/Listings";
import RentFreeModal from "../../components/modals/RentFreeModal";
import SelectCompaniesModal from "../../components/modals/SelectCompaniesModal";
// import { SendPromotionEmailPayload } from "../../utils/interfaces";
// import { useSendPromotionEmailMutation } from "../../redux/services/promotions.service";
// import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Home = () => {
  // const [sendPromotionEmail, { isLoading }] = useSendPromotionEmailMutation();
  // const [submitted, setSubmitted] = useState(false);
  // const [showModal, setShowModal] = useState({
  //   rentFree: false,
  //   selectCompanies: false,
  // });

  // const showModalHandler = (modal: string, value: boolean) => {
  //   setShowModal((prev) => ({
  //     ...prev,
  //     [modal]: value,
  //   }));
  // };

  // useEffect(() => {
  //   showModalHandler("rentFree", true);
  // }, []);


  // const submitValueHandler = async (
  //   sendPromotionEmailPayload: SendPromotionEmailPayload
  // ) => {
  //   try {
  //     const response = await sendPromotionEmail(sendPromotionEmailPayload);
  //     if (response.error) toast.error("Promotional email requst Failed!");
  //     else {
  //       setSubmitted(true);
  //       setTimeout(() => {
  //         setSubmitted(false);
  //       }, 15000);
  //       toast.success("Request submitted successfully");
  //       showModalHandler("selectCompanies", false);
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     toast.error("An unexpected error occurred");
  //   }
  // };

  return (
    <>
      {/* {isLoading && <Loader />}

      {showModal?.rentFree && (
        <RentFreeModal {...{ showModalHandler, showModal }} />
      )}
      {showModal?.selectCompanies && (
        <SelectCompaniesModal
          {...{ showModalHandler, showModal, submitValueHandler }}
        />
      )} */}

      <div className=" h-[100vh]">
        {/* {isLoading && <Loader />} */}
        <Header />
        {/* <Banner /> */}
        <HeroSection />
        <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
            
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Home;
