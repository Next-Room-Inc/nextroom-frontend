import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import SearchPropertyLayout from '../../layouts/SearchProperty.Layout';
import SignupOrLoginModal from '../../components/modals/SignupOrLoginModal';
import useAuth from '../../custom-hooks/useAuth';
import { Button } from '../../components/Button';


const housingdetails = [
  {
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    repairType: "Broken Washing Machine",
    status: "Complete",
    date: "September 15, 2025",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    repairType: "Broken Washing Machine",
    status: "Complete",
    date: "September 15, 2025",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    repairType: "Broken Washing Machine",
    status: "Complete",
    date: "September 15, 2025",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    repairType: "Broken Washing Machine",
    status: "Complete",
    date: "September 15, 2025",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    repairType: "Broken Washing Machine",
    status: "Complete",
    date: "September 15, 2025",
  },
]

const StudentExperianceCenter = () => {
  const { isLoggedIn } = useAuth();

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <SearchPropertyLayout>
      {!isLoggedIn && <SignupOrLoginModal text="View Full Report" />}


      <div className='py-15 md:mx-15'>
        <div className='mx-4'>
          {/* title */}
          <h2 className="text-xl font-bold text-[#B3322F] mb-3 flex md:ml-2 justify-center md:justify-start">
            <img
              src="/assets/img/icons/student-exp-center.svg"
              alt="Like"
              className="h-12 mr-2  -mt-2"
            />
            Student Experience Centre
          </h2>
          {/* SearchBar */}
          <div className='shadow-[#D9D9D9] mb-3  pl-4 pr-8 py-2 mx-auto rounded-full drop-shadow-md shadow-md bg-white mt-5 flex items-center  justify-center gap-3'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder='Search property Repairs'
              className=' focus:outline-none  w-full px-2 py-2'
            />
            {/* <img alt="" className="h-8 mt-1" src="assets/img/icons/google_logo.svg" /> */}
            <MagnifyingGlassIcon className="h-8 text-[#B3322F] mt-1" />
          </div>


          <h2 className="text-xl font-bold text-[#B3322F] mb-3 mt-5 md:ml-2 md:text-left text-center">
            Recent Repairs
          </h2>
        </div>
        {/* Cards */}
        {/* properties */}
        {housingdetails.map((propertyDetails, index) => <HousingCard
          index={index}
          selected={selected === index}
          setSelected={setSelected}
          {...propertyDetails}
        />)}
      </div>

      <div className='text-center '>
        <Button className="rounded-full flex text-white bg-[#B3322F] text-xs font-semibold mt-2 mx-auto py-2 px-8">
          View More
          <ChevronDownIcon className='h-6 -mt-1 ml-1' />
        </Button>
      </div>

    </SearchPropertyLayout>
  )
}

export default StudentExperianceCenter


export const HousingCard: React.FC<{
  imageUrl: string;
  repairType: string;
  status: string;
  date: string;
  setSelected: (value: any) => void
  selected?: boolean,
  index: number,
}> = ({
  index,

  imageUrl,
  repairType,
  date,
  status,
  // matchPercent,
  selected = false,
  setSelected
}) => {
    // const [viewDetails, setViewDetails] = useState(false)
    return (
      <>
        <div

          className={`z-10 md:flex ${selected ? "rounded-tr-xl rounded-tl-xl " : "rounded-xl"}  shadow-md overflow-hidden relative p-6 mx-5 mt-12 bg-white`}
        >
          {/* Like Icon */}
          <img
            src="/assets/img/search-property/heartinner.svg"
            alt="Like"
            className="h-5 absolute md:top-4 md:right-5 right-10 top-10 z-50"
          />

          {/* Image section */}
          <div className="relative w-full md:w-1/4">
            <img
              src={imageUrl}
              alt={"loading"}
              className="w-full h-48 object-cover rounded-2xl"
            />

          </div>

          {/* Content section */}
          <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-top">


            {/* Details */}
            <div className="mt-5 space-y-1 md:text-md text-md">
              <p className="flex items-start">
                <p className='font-bold mr-2'>Repair Type : </p>
                {repairType}
              </p>
              <p className="flex items-start">
                <p className='font-bold mr-2'>Date : </p>
                {date}
              </p>
              <p className="flex items-start ">
                <p className='font-bold mr-2'>Status : </p>
                {status}
              </p>
              <Button
                onClick={() => selected ? setSelected(null) : setSelected(index)}
                className='bg-[#B3322F]  mt-4 text-white text-sm px-10 py-1.5 rounded-full cursor-pointer'>View Report</Button>
            </div>
          </div>
        </div>

        {selected && <RepairDetailsModal />}
        {selected && <RepairReportModal />}

      </>
    );
  };


export const RepairDetailsModal = () => {


  return (
    <>
      <AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="  mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40" >
          {/* Image Gallery */}
          {/* Repair History */}
          <section>
            <h2 className="text-xl font-semibold text-[#B3322F] mb-3">Repair Details</h2>


            {/* review image */}
            <div className="flex gap-2">
              <img src="/assets/img/search-property/review_img_1.png" className="w-30 h-30 object-contain object-center" />
              <img src="/assets/img/search-property/review_img_2.png" className="w-30 h-30 object-contain object-center" />
            </div>

            {/* Repair Card */}
            <div className="  rounded-md  space-y-2">
              <div className="font-bold">uOttawa Student</div>
              <div><span className="font-semibold">Repair Type:</span> Urgent</div>
              <div><span className="font-semibold">Title:</span> Broken Washing Machine</div>
              <div>
                <span className="font-semibold">Details:</span>{" "}
                I wanted to let you know that the washing machine in our unit has stopped working — it won’t start even when plugged in and the cycle won’t begin. Could you please arrange for a repair as soon as possible? Let me know if you need any more details or if someone will be coming by.
              </div>

              {/* Status timeline */}
              <div className="space-y-1">
                <div className="font-semibold">Status:</div>
                {/* <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 bg-red-600 rounded-full"></span> Request Submitted
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Landlord Responded
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Closed Request
                        </div> */}
                <StepComponent />
              </div>

            </div>
          </section>

          {/* Landlord Response Rate */}

          <section>
            <h2 className="text-xl font-semibold  mb-3">Landlord Response Rate:</h2>
            <div className="md:w-60 w-full">


              <div className="relative  w-full">
                <input
                  disabled
                  type="range"
                  className="custom-slider   bg-gradient-to-r from-[#ED1111] to-[#5CE64C]   h-20 rounded-lg"
                  style={{ background: "linear-gradient(to right, #ED1111, #5CE64C)", width: "100%", height: '10px', paddingTop: '10px', borderRadius: "12px", }}
                  min={500}
                  max={2000}
                />
              </div>
              <div className="flex justify-between text-black font-semibold mb-2">
                <p>Slow</p>
                <p>Fast</p>
              </div>
            </div>
          </section>

          {/*  Landlord Response*/}
          <section>
            <h2 className="text-xl font-semibold  mb-3">Landlord Response:</h2>
            <div className="  w-full">
              Thanks for letting me know—I'll arrange for a technician to take a look at the washing machine within the next couple of days.
            </div>
          </section>
        </motion.div>

      </AnimatePresence>

    </>
  )
}
export const RepairReportModal = () => {


  return (
    <>
      <AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="  mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40" >

          <div className="flex flex-col md:flex-row gap-y-5 ">
            <div className="md:w-[50%] w-full">
              <p className="text-center font-bold mb-3 text-[#B3322F] ">Number Of Repairs Submitted Year Over Year (2021-2024)</p>

              <div>
                <ChartComponent />
              </div>

            </div>
            <div className="md:w-[50%] w-full  flex flex-col items-center  justify-center ">
              <div className="md:w-60 w-full font-semibold flex flex-col space-y-2">

                <p className='flex justify-between  '>   <p className='text-[#B3322F] '>Repairs Made Within 30 Days</p>   2   </p>
                <p className='flex justify-between  '>   <p className='text-[#B3322F] '>Repairs Made In One Year</p>   13   </p>
                <p className='flex justify-between  '>   <p className='text-[#B3322F] '>Open Repairs</p>   7   </p>
                <p className='flex justify-between  '>   <p className='text-[#B3322F] '>Closed Repairs</p>   6  </p>
                <p className='flex justify-between  '>   <p className='text-[#B3322F] '>Total Repairs</p>   13   </p>


              </div>


              <div className="mt-10 md:w-auto w-full">
                <h2 className="text-md font-semibold mb-2 text-[#B3322F] ">Average Time To Close Repair (In Days)</h2>
                <div className="md:w-60 w-full">


                  <div className="relative  w-full">
                    <input
                      disabled
                      type="range"
                      className="custom-slider   bg-gradient-to-r from-[#ED1111] to-[#5CE64C]   h-20 rounded-lg"
                      style={{ background: "linear-gradient(to right, #ED1111, #5CE64C)", width: "100%", height: '10px', paddingTop: '10px', borderRadius: "12px", }}
                      min={500}
                      max={2000}
                    />
                  </div>
                  <div className="flex justify-between text-black font-semibold mb-2">
                    <p>Low</p>
                    <p>High</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </motion.div>

      </AnimatePresence>

    </>
  )
}


function StepComponent() {

  function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={stepIdx} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-[#B3322F]" />
                </div>
                <a

                  className="relative flex size-8 items-center justify-center rounded-full bg-[#B3322F] hover:bg-red-900"
                >
                </a>
                <span className="sr-only">{step.name}</span>

              </>
            ) : (
              <>
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a

                  className="group relative flex size-8 items-center justify-center rounded-full border-2 border-[#B3322F] bg-white  "
                >
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-transparent group-hover:bg-[#B3322F]" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            )}
            {/* <p className="-mt-5  h-10 flex items-end bg-red-100">
              {step.name}
              </p> */}
          </li>
        ))}
      </ol>
      <ol role="list" className="flex items-center mt-5">
        {steps.map((step, stepIdx) => (
          <li key={stepIdx} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>

            <>
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <p className="-mt-5  h-10 flex items-end   text-[12px]">
                  {step.name}
                </p>
              </div>
              <a
                href="#"
                className="group relative flex size-8 items-center justify-center rounded-full    hover:border-gray-400"
              >

              </a>
            </>

            {/* <p className="-mt-5  h-10 flex items-end bg-red-100">
              {step.name}
              </p> */}
          </li>
        ))}
      </ol>
    </nav>
  )
}

const steps = [
  { name: <p>Request <br /> Submitted</p>, description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'complete' },
  {
    name: <p>Landlord <br /> Responded</p>,
    description: 'Cursus semper viverra facilisis et et some more.',
    href: '#',
    status: 'complete',
  },
  { name: <p>Closed <br />Request</p>, description: 'Penatibus eu quis ante.', href: '#', status: 'upcoming' },
]

const ChartComponent = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    // Title,
    Tooltip,
    // Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        // display: true,
        // text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['2020', '2021', '2022', '2023', '2024'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1000, 1200, 1500, 1600, 2000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


  return (
    <div className="md:h-65 w-auto mx-auto  p-5 flex justify-center items-center">
      <Line options={options} data={data} />
    </div>
  )
}