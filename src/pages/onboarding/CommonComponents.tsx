export const NextButton: React.FC<{
    disabled?: boolean;
    onClick: () => void;
    className?: string;
}> = ({ onClick, className = '', disabled = false }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${disabled ? 'bg-[#D9D9D9] ' : 'bg-black hover:bg-[#B3322F]'}  w-[250px] md:w-[180px] text-center py-2 text-white rounded-full mt-18  ${className}`}
        >
            Next
        </button>
    );
};

export const PrimaryButton: React.FC<{
    selected?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: string | null;
    className?: string;
    button?: boolean;
    // type?: "button" | "submit" | "reset";
}
> = ({
    selected = false,
    children = '',
    onClick = () => { },
    icon = null,
    className = '',
    button = false,
    // type = "button",
}) => {
        const bgColor = button
            ? 'bg-[#B3322F] hover:bg-black'
            : selected
                ? 'bg-[#B3322F] hover:bg-[#b3312fa2]'
                : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]';

        return (
            <button
                onClick={onClick}
                // type={type}
                className={`w-[250px] text-center py-2 text-white rounded-full flex items-center justify-center ${bgColor} ${icon ? 'gap-2' : ''} ${className}`}
            >
                {children}
                {icon && <img src={icon} alt="" className="h-3 mt-1.5" />}
            </button>
        )
    };


export const ExitConfirmationSection: React.FC<{
    setExitForm: (value: boolean) => void;
}
> = ({ setExitForm }) => {
    return (
        <div className="text-center">
            <img
                alt="Exit Confirmation"
                className="h-35 mx-auto"
                src="/assets/img/icons/owl_icon_red.svg"
            />

            <p className="text-2xl text-[#B3322F] font-semibold w-full px-10 mx-auto">
                Are You Sure?
            </p>

            <p className="text-2xl text-[#B3322F] mt-5 w-full px-10 mx-auto">
                The more questions you answer, the better we can match you with your perfect home.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10">
                <PrimaryButton button={true} onClick={() => setExitForm(false)}>
                    Resume
                </PrimaryButton>

                <PrimaryButton button={true}>
                    Yes
                </PrimaryButton>
            </div>
        </div>
    );
};


export const transitionVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};