import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { HomeComponent } from "./Home.Components";

const Home = () => {
  console.log("home hit")
  return (
    <>
       
      <div className=" h-[100vh]">
      <Header />
        <div><HomeComponent /></div>

        <div className="mx-auto max-w-2xl pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Home;
