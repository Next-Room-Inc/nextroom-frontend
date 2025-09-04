export const GiftBar = () => {
    return (
        <div className="bg-[#B3322F] flex flex-col lg:flex-row text-white   items-center  lg:py-0 py-10  -mt-9 px-10">
            <div className="">
                <img
                    src={`/assets/images/open_gift.svg`}
                    alt=""
                    className={'w-50 lg:w-70 mx-auto lg:mx-20'}
                />
            </div>
            <div className=" lg:pt-10 ">
                <h1 className="text-center lg:text-left text-3xl lg:text-5xl font-bold">Sign Up. Get Entered. Win Big.</h1>
                <p className="text-center lg:text-left mt-8 lg:mt-2  text-xl lg:text-3xl">Score prizes like free Juice Dudez, Escape Manor experiences, and more!</p>
            </div>
        </div>
    )
}