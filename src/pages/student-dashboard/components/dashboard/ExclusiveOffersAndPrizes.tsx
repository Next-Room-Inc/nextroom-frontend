import { Button } from "@src/components/Button";
import Loader, { LoaderComponent } from "@src/components/Loader";
import useAuth from "@src/custom-hooks/useAuth";
import { useClaimOfferMutation, useGetAllOffersQuery } from "@src/redux/services/offers.service";
import { toast } from "react-toastify";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Offer = {
    offerId: string;
    title: string;
    description: string;
};

export const ExclusiveOffersAndPrizes = () => {
    const { user } = useAuth();
    const { data: offers = [], isLoading } = useGetAllOffersQuery();
    const [claimOffer, { isLoading: isClaiming }] = useClaimOfferMutation();

    const claimHandler = async (offerId: string) => {
        if (!user?.userId) {
            toast.error("You must be logged in to claim an offer.");
            return;
        }
        try {

            // Use unwrap() to get direct success/error
            await claimOffer({ userId: user.userId, offerId }).unwrap();


            toast.success("Successfully claimed the offer!");
        } catch (err: any) {
            console.error("claimOffer error:", err);
            toast.error(err?.data || "Failed to claim the offer. Please try again.");
        }
    };


    return (
        <div className="h-full w-full p-8 bg-white text-center">
            {(isClaiming) && (<Loader />)}

            {isLoading ? <div className="flex items-center justify-center h-60">
                <LoaderComponent />
            </div> : offers.length === 0 ? (
                <p className="text-gray-500">No offers available right now. Please check back later!</p>
            ) : (
                <>
                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer: Offer) => (
                            <SubscriptionCard
                                key={offer.offerId}
                                title={offer.title}
                                description={offer.description}
                                buttonText={"Claim"}
                                onClick={() => claimHandler(offer.offerId)}
                            />
                        ))}
                    </div>

                    {/* Mobile Slider */}
                    <div className="w-full md:hidden">
                        <ExclusiveOffersAndPrizeSlider
                            offers={offers}
                            claimHandler={claimHandler}
                        />
                    </div>

                    {/* Footer Message */}
                    <div className="mt-10">
                        <p className="text-[#B3322F] font-semibold">
                            New offers and prizes are added regularly.
                        </p>
                        <p className="text-gray-600">
                            Check back often to see what’s available!
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};


export const ExclusiveOffersAndPrizeSlider: React.FC<{ offers: any, claimHandler: any }> = ({ offers, claimHandler }) => {
    return (
        <>
            <div className="w-full mx-auto ">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}

                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {offers.map((offer: any, idx: number) => (
                        <SwiperSlide key={idx}>
                            <SubscriptionCard
                                key={idx}
                                title={offer.title}
                                description={offer.description}
                                buttonText="Claim"
                                onClick={() => claimHandler(offer.offerId)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};





const SubscriptionCard: React.FC<{
    logo?: string;
    title: string;
    description: string;
    buttonText?: any;
    onClick?: () => void;
}> = ({
    // logo = "/assets/logo/chexy_white_logo.svg",
    title,
    buttonText = "Claim",
    description = "",
    onClick,
}) => {
        return (
            <div className="p-6 text-center shadow-sm rounded-2xl flex flex-col items-center justify-between bg-[#B3322F] text-white py-15">
                <div className="w-full flex items-center flex-col">
                    {/* <img
                        src={logo}
                        alt="subscription logo"
                        className="w-35 mx-auto lg:mx-20"
                    /> */}

                    <h1 className=" mb-5 font-bold text-3xl">{title}</h1>
                    <h1 className="my-5 text-gray-300">{description}</h1>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[200px] mt-10">
                    <Button
                        onClick={onClick}
                        className="text-[#B3322F] bg-white py-2 rounded-full"
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        );
    };