import FooterNew from "@src/components/FooterNew";
import { HomeComponent } from "./Home.Components";
import { useState } from "react";
import { Header } from "@src/components/Header";

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  return (
    <>
      <div className=" h-[100vh]">
        <Header {...{ setShowLoginForm }} />
        <HomeComponent  {...{ showLoginForm, setShowLoginForm }} />
        <FooterNew />
      </div>
    </>
  );
};
export default Home;
