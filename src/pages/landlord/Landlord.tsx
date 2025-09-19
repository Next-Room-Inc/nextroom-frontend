import { LandLordFlowSlider } from "@src/components/LandLordFlowSlider";
import LandlordDashboardLayout from "@src/layouts/LandlordDashboard.Layout";
import { useFormik } from "formik";
import Wave from "react-wavify";
import { motion } from "framer-motion";

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

type StepCardProps = {
  title: string;
  waveStyle?: React.CSSProperties;
  delay?: number;
  number: number | string;
};

function StepCard({ title, waveStyle, delay = 0, number }: StepCardProps) {
  return (
    <motion.div
      className="flex gap-3 flex-col items-center justify-center mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Circle with Wave + Number */}
      <div className="w-70">
        <div className="rotate-180 bg-white h-40 w-40 rounded-full overflow-hidden mx-auto relative shadow-lg">
          <Wave
            fill="#B3322F"
            paused={false}
            style={waveStyle}
            options={{
              height: 2,
              amplitude: 20,
              speed: 0.2,
              points: 2,
            }}
          />
          <p className="absolute top-1/2 rotate-180 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl drop-shadow-lg text-white mt-4">
            {number}
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="text-xl md:text-3xl font-normal text-[#B3322F] mt-6 text-center w-70 px-5 md:px-0 min-h-[72px]">
        {title}
      </div>
    </motion.div>
  );
}


const Landlord = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: "",
    onSubmit: () => { },
  });

  const steps = [
    {
      title: "Signup On NextRoom.ca",
      number: 1,
      waveStyle: { height: "50%", marginTop: 90 },
    },
    {
      title: "List Your Property",
      number: 2,
      waveStyle: { height: "100%", marginTop: 50 },
    },
    {
      title: "Find Your Perfect Student Tenants",
      number: 3,
      waveStyle: { height: "100%", marginTop: 0 },
    },
  ];

  return (
    <LandlordDashboardLayout>
      <div className="bg-[url(/assets/img/backgrounds/landlord-banner.png)] min-h-[calc(100vh-60px)] bg-cover bg-center flex items-center justify-center gap-25">
        <h2 className="text-[70px] text-white">
          <span className="block">Meet Students</span> Where They Are.{" "}
          <span className="block">For Free.</span>
        </h2>
        <div className="w-140 flex flex-col items-center justify-center px-20 py-20 bg-[rgba(179,50,47,0.5)] rounded-md">
          <h3 className="text-[28px] text-white">Let’s Get Started</h3>
          <div
            className={`mt-8 ${inputClass} ${formik.touched.email && formik.errors.email
                ? "outline-1 outline-red-600"
                : "outline-1 outline-gray-300"
              }`}
          >
            <input
              placeholder="Email Address"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${formik.touched.email && formik.errors.email
                  ? "outline-red-600"
                  : "outline-white"
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-600 ml-3 mt-2">
                {formik.errors.email}
              </div>
            )}
          </div>
          <button className="bg-[#000000] text-base text-white mt-8 py-4 w-full rounded-full font-semibold transition z-10">
            Check For Properties/List Properties
          </button>
        </div>
      </div>

      <div className=" bg-[url(/assets/img/backgrounds/list-property-background.png)] min-h-[calc(100vh-60px)] bg-cover bg-center mt-8 flex flex-col items-center mt-10">
        <button className="bg-[#000000] text-[20px] text-white mt-[-28px] mb-8 py-4 px-60 rounded-full font-semibold transition z-10">
          List Your Property
        </button>
        <div className="flex items-center justify-end mt-15">
          <div className="w-[35%] mr-30">
            <div className="flex">
              <img
                className="w-[100px] h-[100px]"
                src="/assets/img/images/uottawa_hor_white.png"
              />
              <img
                className="w-[100px] h-[100px]"
                src="/assets/img/images/cu-logo-color-vertical.png"
              />
            </div>
            <p className="text-[30px] text-white mt-8">
              Next Room is proud to support the student community by working
              with the University of Ottawa Students’ Union (UOSU) and the
              Carleton University Students’ Association (CUSA) to help students
              access safe, affordable, and reliable off-campus housing.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-5 my-8">
        <h3 className="text-center text-[40px] text-[#B3322F] font-bold mb-4">
          Why List With Next Room
        </h3>
        <LandLordFlowSlider />
      </div>
      <div className=" bg-[url(/assets/img/backgrounds/landlord-background2.png)] min-h-[calc(100vh-60px)] bg-cover bg-center flex items-center justify-end">
        <div className="w-[35%] mr-30">
          <p className="text-[30px] text-white mb-4">
            “In my time as a City Councillor and an MPP, I’ve seen the gap that
            exists in support for student housing - Next Room is addressing that
            gap and creating a platform that could be expanded to help other
            marginalized groups find safe housing.”
          </p>
          <span className="block text-[32px] text-white mb-2">
            Catherine McKenney
          </span>
          <span className="block text-[32px] text-white">
            MPP for Ottawa Centre
          </span>
        </div>
      </div>
      <div className="mx-5 my-8 flex flex-col items-center">
        <h3 className="text-center text-[40px] text-[#B3322F] font-bold mb-4">
          How Next Room Works
        </h3>
        <div>
          <div className="pt-4 flex">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                title={step.title}
                number={step.number}
                waveStyle={step.waveStyle}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
        <button className="bg-[#000000] text-[20px] text-white mt-20 mb-8 py-4 px-60 rounded-full font-semibold transition z-10">
          List Your Property
        </button>
      </div>
    </LandlordDashboardLayout>
  );
};

export default Landlord;
