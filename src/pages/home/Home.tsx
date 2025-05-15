import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { HomeComponent } from "./Home.Components";

const Home = () => {
  return (
    <>
      <div className=" h-[100vh]">
        <Header />
        <HomeComponent />
        <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Home;
