import Footer from "../components/Footer";
import Header from "../components/Header";
import { APP_INFO } from "../utils/constants";

const AuthLayout = ({ children }) => (
  <div
    className="flex flex-col min-h-screen bg-center bg-cover"
    style={{
      backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/backgrounds/backgrounds_7.png)`,
    }}
  >
    <Header darkMode={false} />
    <main className="flex-grow flex justify-center items-center p-5">
      <div className="w-full max-w-md text-center">
      <img
            alt=""
            src={APP_INFO.PRIMARY_LOGO}
            className="h-20 md:h-35 w-auto mx-auto"
          />
          {children}
          </div>
    </main>
    <Footer />
  </div>
);
export default AuthLayout;
