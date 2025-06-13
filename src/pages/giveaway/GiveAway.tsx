import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ChoosePropertyModal from '../../components/modals/ChoosePropertyModal'
import GiveAwayModal from '../../components/modals/GiveAwayModal'
import WinFreeRentModal from '../../components/modals/WinFreeRentModal'
import { getDaysRemaining } from '../../utils/functions'
import GiveAwayComponents from './GiveAway.Components'

const GiveAway = () => {
  const [popupStep, setPopUpStep] = useState<number|null>(null)

  useEffect(() => {
    setPopUpStep(1);
  }, [])

  const nextStepHandler = () => {
    // if (popupStep === 4) {
    //   setPopUpStep(null)
    // } else {
      setPopUpStep((prev) => (prev|| 0) + 1)
    // }
  }
  
  const closeModal = () => setPopUpStep(null)
  const daysLeft = getDaysRemaining("2025-06-29");
  const props = {...{nextStepHandler, daysLeft,closeModal }}

  return (
    <div className=" h-[100vh]">
      {popupStep === 1 && <WinFreeRentModal {...props} />}
      {popupStep === 2 && <GiveAwayModal {...props} />}
      {popupStep === 3 && <ChoosePropertyModal {...props} />}
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


