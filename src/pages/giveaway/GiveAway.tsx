import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import WinFreeRentModal from '../../components/modals/WinFreeRentModal'
import { ROUTES } from '../../utils/constants'
import { getDaysRemaining } from '../../utils/functions'
import GiveAwayComponents from './GiveAway.Components'

const GiveAway = () => {
  const navigate = useNavigate();
  const [popupStep, setPopUpStep] = useState<number|null>(null)

  useEffect(() => {
    setPopUpStep(1);
  }, [])

  const nextStepHandler = () => {
     navigate(ROUTES.SIGNUP);
    // if (popupStep === 4) {
    //   setPopUpStep(null)
    // } else {
      // setPopUpStep((prev) => (prev|| 0) + 1)
    // }
  }
  
  const closeModal = () => setPopUpStep(null)
  const daysLeft = getDaysRemaining("2025-07-11");
  const props = {...{nextStepHandler, daysLeft,closeModal }}
console.log("daysLeft==>",daysLeft)
  return (
    <div className=" h-[100vh]">
      {popupStep === 1 && <WinFreeRentModal {...props} />}
      {/* {popupStep === 2 && <GiveAwayModal {...props} />}
      {popupStep === 3 && <ChoosePropertyModal {...props} />} */}
      {/* {popupStep === 3 && <FollowInstagramModal {...props} />}
      {popupStep === 4 && <AlwaysWinnerModal {...props} />} */}

      <Header />
      <div className="mt-18 min-h-screen flex flex-col bg-[url('/assets/img/backgrounds/backgrounds_7.png')] bg-cover bg-no-repeat bg-fixed">

        <GiveAwayComponents />
      </div>
      <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
        <Footer />
      </div>
    </div>
  )
}

export default GiveAway


