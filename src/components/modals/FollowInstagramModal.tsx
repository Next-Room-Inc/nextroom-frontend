import { APP_INFO } from "../../utils/constants";
import { motion } from 'framer-motion';


const FollowInstagramModal: React.FC<{
  nextStepHandler: () => void;
}> = ({ nextStepHandler }) => {

  const followNextroom = () => {
    // Open Instagram in a new tab
    window.open(APP_INFO.INSTAGRAM, "_blank", "noopener,noreferrer");

    // Trigger the next step in the current tab
    nextStepHandler();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" style={{ zIndex: '99' }}>

      <div className="bg-[#B00000] text-white bg-cover bg-center p-8 rounded-2xl text-center w-md md:py-20 py-10 mx-auto "
        style={{
          backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/backgrounds/follow_instagram_bg.png)`, // update path as needed
        }}
      >
        <h2 className="md:text-5xl text-4xl font-bold">ONE LAST STEP</h2>



        <motion.img
          src="assets/img/icons/bell_yellow.svg"
          alt="Bell"
          className="w-70 mx-auto"
          animate={{
            rotate: [0, -10, 10, -10, 10, 0], // swinging
            x: [0, -3, 3, -3, 3, 0],          // subtle horizontal motion
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.2,
            ease: "easeInOut",
          }}
        />


        <button className="bg-white hover:bg-black hover:text-white cursor-pointer text-[#B00000] font-semibold py-3 px-8 rounded-full md:text-xl" onClick={followNextroom}>
          FOLLOW NEXTROOM_CA
        </button>
      </div>
    </div>
  );
};

export default FollowInstagramModal;
