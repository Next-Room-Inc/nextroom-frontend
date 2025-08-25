import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Button, PrimaryButton } from "../../../../components/Button";
import { DropDownSelector } from "../../../../components/DropDownSelector";
import { ModalOverlay } from "../../../../components/ModalOverLay";
import Chat from "../../../chat/Chat";

const Renters = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const companies = [
    {
      name: "Alma",
      imageDesktop: "/assets/img/events/event_1.png",
      imageMobile: "/assets/img/events/event_1_mobile.png",
      units: [304, 408],
    },
    {
      name: "Theo",
      imageDesktop: "/assets/img/events/event_1.png",
      imageMobile: "/assets/img/events/event_1_mobile.png",
      units: [408],
    },
  ];

  return (
    <div>
      {companies?.map((company) => (
        <div key={company.name}>
          {/* Company Card */}
          <PropertyCard
            onClick={() => {
              selectedCompany === company.name
                ? setSelectedCompany(null)
                : setSelectedCompany(company.name);
              setSelectedUnit(null);
            }}
            propertyName={company.name}
            imageDesktop={company.imageDesktop}
            imageMobile={company.imageMobile}
          />

          {/* Animate Units when company is selected */}
          <AnimatePresence>
            {selectedCompany === company.name &&
              company.units.map((unit) => (
                <motion.div
                  key={unit}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <UnitHeader
                    onClick={() =>
                      selectedUnit === unit
                        ? setSelectedUnit(null)
                        : setSelectedUnit(unit)
                    }
                  >
                    Unit {unit}
                  </UnitHeader>

                  {/* Animate renters when unit is selected */}
                  <AnimatePresence>
                    {unit === selectedUnit && (
                      <motion.div
                        key={`renters-${unit}`}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                      >
                        {rentersData.map((renter, idx) => (
                          <RenterStudentCard key={idx} {...renter} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Renters;

// Renter Card (Dynamic)
const RenterStudentCard = ({
  name,
  university,
  year,
  monthsCompleted,
  totalMonths,
  image,
}: {
  name: string;
  university: string;
  year: string;
  monthsCompleted: number;
  totalMonths: number;
  image: string;
}) => {
  const [modal, setModal] = useState<string | null>(null);

  const closeHandler = () => setModal(null);

  return (
    <>
      {/* Modals */}
      {modal === "chat" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40"
        >
          <div className="w-[100%]  bg-white rounded-xl shadow-xl overflow-hidden">
            <Chat closeChat={closeHandler} chatModal={true} />
          </div>
        </motion.div>
      ) : (
        modal && (
          <ModalOverlay onClose={closeHandler}>
            {modal === "profile" && (
              <StudentDetailsModal close={closeHandler} />
            )}
            {modal === "report" && <ReportActionHandler close={closeHandler} />}
          </ModalOverlay>
        )
      )}

      <div className="bg-[#B3322F] p-5 rounded-xl py-8 pb-12">
        <img src={image} alt={name} className="w-30 rounded-full mx-auto" />

        <div className="text-center text-white flex flex-col gap-1 my-8">
          <p className="font-bold">{name}</p>
          <p className="font-light">
            {university} - {year}
          </p>
          <p className="font-light">
            {monthsCompleted}/{totalMonths} Months Complete
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-5 px-5 font-semibold">
          <Button
            className="bg-white w-full text-[#B3322F] py-2 rounded-full"
            onClick={() => setModal("profile")}
          >
            View Full Profile
          </Button>
          <Button
            className="bg-white w-full text-[#B3322F] py-2 rounded-full"
            onClick={() => setModal("chat")}
          >
            Message
          </Button>
          <Button
            className="bg-white w-full text-[#B3322F] py-2 rounded-full"
            onClick={() => setModal("report")}
          >
            Report
          </Button>
        </div>
      </div>
    </>
  );
};

// Unit Header
const UnitHeader = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-full bg-white shadow-md py-3 px-5 font-semibold my-10"
    >
      {children}
    </div>
  );
};

// Property Card (Dynamic)
const PropertyCard = ({
  propertyName,
  imageDesktop,
  imageMobile,
  onClick,
}: {
  propertyName: string;
  imageDesktop: string;
  imageMobile: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="my-10 rounded-2xl md:rounded-xl shadow-md bg-white flex flex-col md:flex-row overflow-hidden"
    >
      <div
        className={` md:bg-[url('${imageDesktop}')] bg-[url('${imageMobile}')] bg-center bg-cover h-60 md:w-[50%] `}
      ></div>
      <div className="bg-white text-[#B3322F] md:h-60 h-30 md:w-[50%] flex justify-center items-center text-center">
        <div>
          <div className="text-2xl md:text-3xl font-bold">
            {propertyName} Properties
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================== Sample Data =====================
const rentersData = [
  {
    name: "Anna G.",
    university: "Carleton University",
    year: "First Year",
    monthsCompleted: 3,
    totalMonths: 12,
    image: "/assets/img/search-property/student_profile (2).png",
  },
  {
    name: "John M.",
    university: "University of Ottawa",
    year: "Second Year",
    monthsCompleted: 5,
    totalMonths: 12,
    image: "/assets/img/search-property/student_profile (3).png",
  },
  {
    name: "Sophia L.",
    university: "Carleton University",
    year: "Third Year",
    monthsCompleted: 9,
    totalMonths: 12,
    image: "/assets/img/search-property/student_profile (4).png",
  },
  {
    name: "Mike T.",
    university: "University of Ottawa",
    year: "First Year",
    monthsCompleted: 1,
    totalMonths: 12,
    image: "/assets/img/search-property/student_profile (5).png",
  },
];

// ===================== Sample Data =====================
const ReportActionHandler: React.FC<{ close: () => void }> = ({ close }) => {
  const [urgency, setUrgency] = useState<string | number | null>("");
  const [roommate, setRoommate] = useState<string | number | null>("");
  const [, setImages] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const urgencyOptions = ["Urgent", "Moderate", "Low"];

  const ImageComponent = () => (
    <img
      src="/assets/img/search-property/student_profile (1).png"
      alt={"loading..."}
      className="w-8 rounded-full"
    />
  );

  const roommatesOptions: any[] = [
    <div className="flex items-center gap-4">
      {" "}
      <ImageComponent /> Anna G
    </div>,
    <div className="flex items-center gap-4">
      {" "}
      <ImageComponent /> Rae L.
    </div>,
    <div className="flex items-center gap-4">
      {" "}
      <ImageComponent /> Sam H.
    </div>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      // className=" rounded-xl px-5"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 text-[#B3322F] font-semibold mb-4">
        {/* Urgency Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <label htmlFor="urgency">Urgency</label>

          <DropDownSelector
            options={urgencyOptions}
            selected={urgency}
            onSelect={setUrgency}
            className="py-3 md:ml-5 px-6 w-60 bg-white text-[#B3322F] flex justify-between"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <label>Images</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <div
            onClick={handleFileClick}
            className="shadow-md bg-white border border-transparent w-full md:w-60 flex   rounded-full py-2 px-5 ml-4 items-center gap-2 hover:shadow-lg transition duration-150"
          >
            <ArrowUpTrayIcon className="h-5" />
            <span>Upload</span>
          </div>
        </div>
      </div>
      {/* Roommates */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-6 font-semibold text-[#B3322F]">
        <label htmlFor="urgency">Roommate</label>

        <DropDownSelector
          options={roommatesOptions}
          selected={roommate}
          onSelect={setRoommate}
          className="py-2 px-6 w-60 bg-white text-[#B3322F] flex justify-between items-center"
        />
      </div>
      {/* subject */}
      <textarea
        className="mb-3 bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Subject line"
        rows={1}
      />
      {/* Description Textarea */}
      <textarea
        className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Start Typing..."
        rows={10}
      />

      {/* Submit Button */}
      <PrimaryButton
        color="red"
        className="w-60 py-3 text-xs mt-4 mx-auto"
        onClick={close}
      >
        Submit
      </PrimaryButton>

      {/* warning */}
      <div className="text-center mt-20 px-5">
        <img
          alt="Warning Icon"
          src="/assets/img/icons/warningicon.svg"
          className="h-16 mx-auto mb-5"
        />

        <h2 className="text-lg font-bold mb-2">Thank you for reporting.</h2>

        <p className="mx-auto w-full md:w-[50%] xl:[40%] text-sm md:text-base">
          We take all incidents seriously and work with landlords,
          post-secondary institutions, and even the police when necessary.
          <br className="hidden md:inline" />
          <span className="font-bold">
            Always call 911 first if your situation puts you in immediate
            danger.
          </span>
        </p>
      </div>
    </motion.div>
  );
};

const StudentDetailsModal: React.FC<{ close: () => void }> = ({}) => {
  type PersonalityItem = {
    icon: string;
    label: string;
    score: number; // 1 to 5
  };

  const personalityData: PersonalityItem[] = [
    { icon: "", label: "Partier Level", score: 2 },
    { icon: "📖", label: "Study Focus Level", score: 5 },
    { icon: "🧹", label: "Cleanliness & Responsibility", score: 4 },
    { icon: "🤔", label: "Privacy & Independence", score: 1 },
    { icon: "✌️", label: "Values & Boundaries", score: 5 },
  ];
  return (
    <div className="md:px-5">
      <div className="p-4 rounded-2x">
        <h2 className="text-center font-semibold text-lg mb-4">
          Personality Insights
        </h2>

        <div className="flex flex-col gap-4">
          {personalityData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              {/* Left side: Icon + Label */}
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-800">{item.label}</span>
              </div>

              {/* Right side: Score (5 dots) */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                      i < item.score ? "bg-[#B3322F]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
