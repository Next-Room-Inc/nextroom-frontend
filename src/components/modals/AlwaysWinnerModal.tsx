const AlwaysWinnerModal: React.FC<{
    nextStepHandler: () => void;
    daysLeft:string
}> = ({nextStepHandler}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" style={{ zIndex: '99' }}>

            <div className="bg-[#9D0102] text-white p-8 rounded-2xl text-center max-w-md mx-auto  py-15" onClick={nextStepHandler}>
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

                <p className="italic text-md">Lock in your spot for school, and enjoy<br/> summer on us!</p>

            </div>
        </div>
    );
};
export default AlwaysWinnerModal;
