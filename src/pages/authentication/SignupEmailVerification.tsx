import { Button } from '@src/components/Button'
import FooterNew from '@src/components/FooterNew'
import { ROUTES } from '@src/utils/constants'
import { useNavigate } from 'react-router-dom'

const SignupEmailVerification = () => {
    const navigate = useNavigate()
    const onClickHandler = () => navigate(ROUTES.ONBOARDING)
    return (
        <div>
            {/* Header */}
            <header className="bg-[#B3322F] text-white px-6 lg:px-8 py-10">
                <div className="flex justify-center mb-6">
                    <img
                        alt="NextRoom Logo"
                        src="/assets/logo/nextroom_white_logo.svg"
                        className="h-20 md:h-24 w-auto"
                    />
                </div>
            </header>

            {/* Body */}
            <main className="py-20 text-center px-5 md:px-0">
                <div className="flex justify-center mb-6">
                    <img
                        alt="Owl Flight"
                        src="/assets/logo/owlflight2.svg"
                        className="h-30 md:h-50 w-auto"
                    />
                </div>

                <h1 className="text-2xl text-[#B3322F]">
                    Hi <span className="font-bold">[Student Name],</span>
                </h1>

                <p className="text-xl mt-8">
                    Thanks for signing up with Next Room — your destination to verified student housing and roommate matching.
                </p>
                <p className="text-xl mt-5">Please confirm your email to continue:</p>

                <Button
                    onClick={onClickHandler}
                    className="bg-[#B3322F] text-white w-full md:w-fit py-3 md:px-20 my-5 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"
                >
                    Confirm & Complete My Account
                </Button>

                <p className="text-xl">Once confirmed, you’ll be able to:</p>
                <ul className="text-[#B3322F] list-disc list-inside my-4 text-center inline-block">
                    <li>Personalize your student profile</li>
                    <li>Set your housing preferences</li>
                    <li>Get early access to verified listings</li>
                    <li>Access exclusive events and prizes</li>
                    <li>Connect with roommates who match your lifestyle</li>
                </ul>

                <p className="text-xl">
                    It only takes a minute, and you’ll be ready to explore everything Next Room has to offer.
                </p>

                <p className="text-xl font-bold mb-10 mt-5">
                    If you didn’t sign up for Next Room, you can safely ignore this email.
                </p>

                <p className="text-xl text-[#B3322F]">See you there,</p>
                <p className="text-xl text-[#B3322F]">The Next Room Team</p>
            </main>

            <FooterNew logo={false} languages={false} />
        </div>
    )
}


export default SignupEmailVerification