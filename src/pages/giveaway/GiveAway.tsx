import Footer from '../../components/Footer'
import Header from '../../components/Header'
import GiveAwayComponents from './GiveAway.Components'

const GiveAway = () => {
  return (
    <div className=" h-[100vh]">
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