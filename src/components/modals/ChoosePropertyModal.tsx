import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { getDaysRemaining } from "../../utils/functions";


const ChoosePropertyModal: React.FC<{
  submitForm: ( ) => void
}> = ({ submitForm }) => {
  const daysLeft = getDaysRemaining("2025-07-11");
  // const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([]);
  const [isTheoHovered, setIsTheoHovered] = useState(false);
  const [isAlmaHovered, setIsAlmaHovered] = useState(false);

  const toggleSelection = (property: string) => {
    setSelected((prev) =>
      prev.includes(property)
        ? prev.filter((item) => item !== property)
        : [...prev, property]
    );
  };

  const nextStepHandler = () => {
    const selectedQuery = selected.map(item => item).join("/");
    localStorage.setItem('property', selectedQuery)
    submitForm()
  }

  return (
    <div className="fixed inset-0   flex items-center justify-center bg-black/50 px-4" style={{ zIndex: '99' }}>
      <div className="bg-[#B00000] text-white md:p-8 px-4 py-6 rounded-2xl text-center w-xl mx-auto space-y-6 md:px-15" >
        <h2 className="text-3xl font-bold">
          CHOOSE <br />
          YOUR PROPERTY
        </h2>
        <p className="text-sm mt-2">
          By entering, you consent to receive occasional emails with offers and promotions. You can unsubscribe at any time.
        </p>

        <div className="flex justify-center md:gap-6 gap-3 mt-6">
          <div className={`${selected.includes('alma') ? 'bg-black' : 'bg-[#8A0000]'} w-[50%] rounded-xl cursor-pointer relative `}
            onClick={() => toggleSelection('alma')}
            onMouseEnter={() => setIsAlmaHovered(true)}
            onMouseLeave={() => setIsAlmaHovered(false)}
          >
            <img src="/assets/img/groups/Byward_Market/backup-white-logo.png" alt="Alma" className="w-20 pt-4 mx-auto" />
            {
              isAlmaHovered ?
                <img src={"/assets/img/icons/alma_fighter_1.svg"} alt="Alma" className="md:h-45 h-30 mt-2 mx-auto transition duration-300 ease-in-out" /> :
                <img src={"assets/img/icons/alma_fighter_2.svg"} alt="Alma" className="md:h-45 h-30 mt-2 mx-auto transition duration-300 ease-in-out" />
            }
            {/* <img src={isAlmaHovered ? "/assets/img/icons/alma_fighter_1.svg" : "assets/img/icons/alma_fighter_2.svg"} alt="Alma" className="md:h-45 h-30 mt-2 mx-auto transition duration-300 ease-in-out"

            /> */}

            <CheckCircleIcon
              aria-hidden="true"
              className={
                `size-5 absolute top-3 right-3 transition-opacity ${selected.includes('alma') ? "text-[#8A0000] opacity-100" : "opacity-0"}`

              }
            />
          </div>
          <div className={`${selected.includes('theo') ? 'bg-black' : 'bg-[#8A0000]'} w-[50%] rounded-xl cursor-pointer relative`}
            onClick={() => toggleSelection('theo')}
            onMouseEnter={() => setIsTheoHovered(true)}
            onMouseLeave={() => setIsTheoHovered(false)}
          >
            <img src="/assets/img/groups/Theo/white-logo.png" alt="Theo" className="w-20 pt-4 mx-auto" />
            {/* <img src={isTheoHovered ? "/assets/img/icons/theo_fighter_1.svg" : "assets/img/icons/theo_fighter_2.svg"} alt="Theo" className="md:h-45 h-30 mt-2 mx-auto  transition duration-300 ease-in-out" /> */}
            {
              isTheoHovered ?
                <img src={"/assets/img/icons/theo_fighter_1.svg"} alt="Theo" className="md:h-45 h-30 mt-2 mx-auto  transition duration-300 ease-in-out" />
                :
                <img src={"assets/img/icons/theo_fighter_2.svg"} alt="Theo" className="md:h-45 h-30 mt-2 mx-auto  transition duration-300 ease-in-out" />

            }
      
            <CheckCircleIcon
              aria-hidden="true"
              className={
                `size-5 absolute top-3 right-3 transition-opacity ${selected.includes('theo') ? "text-[#8A0000] opacity-100" : "opacity-0"}`

              }
            />
          </div>
        </div>

        <button disabled={selected === null}
          className={`${selected === null ? 'bg-[#ffffff44]' : 'bg-white hover:bg-black hover:text-white cursor-pointer'} text-[#B00000] font-semibold py-2 px-6 rounded-full   `}
          onClick={nextStepHandler}>
          ENTER GIVEAWAY
        </button>

        <div className="flex justify-center items-center gap-1 text-black">
          <span className="bg-black text-white font-bold text-4xl w-11 h-11 flex items-center justify-center rounded-md pb-1">{daysLeft[0] || 0}</span>
          <span className="bg-black text-white font-bold text-4xl w-11 h-11 flex items-center justify-center rounded-md pb-1">{daysLeft[1] || 0}</span>
          <span className="text-black text-2xl font-extrabold leading-6 -mt-1">DAYS <br />LEFT</span>
        </div>
      </div>
    </div>

  );
};

export default ChoosePropertyModal;
