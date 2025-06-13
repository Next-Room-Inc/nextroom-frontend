
const AlwaysWinnerModal: React.FC<{
    nextStepHandler: () => void;
}> = ({ nextStepHandler }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" style={{ zIndex: '99' }}>

            <div className="bg-[#9D0102] relative text-white p-8 rounded-2xl text-center max-w-md mx-auto  py-15" >


                <h2 className="text-5xl font-bold mb-4">ALWAYS <br />A WINNER!</h2>

                <p className="text-md mb-4">
                    Even if you don’t win this giveaway,<br />
                    you’re automatically entered for<br />
                    <strong>more prizes all summer long!</strong>
                </p>

                <p className="text-md mb-4">
                    Plus, you can still claim a <br />
                    <strong>FREE Summer Stay at THEO or Alma</strong> <br />
                    — just sign and pay for your lease starting this September.
                </p>

                <p className="italic text-md">Lock in your spot for school, and enjoy<br /> summer on us!</p>

                <button
              onClick={nextStepHandler}
              className="bg-white mt-6 text-black py-2 px-16 rounded-full font-semibold hover:bg-black hover:text-white transition z-10 cursor-pointer"
            >
              Explore
            </button>

            </div>
        </div>
    );
};
export default AlwaysWinnerModal;
