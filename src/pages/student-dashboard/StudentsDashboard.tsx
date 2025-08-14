import { useParams } from "react-router-dom";
import StudentDashboard from "../../layouts/StudentDashboard.Layout";
import Explore from "./components/Explore";
import Matches from "./components/Matches";
import MyHousingSearch from "./components/MyHousingSearch";
import { ResponsiveTabSelector } from "./common/ResponsiveTabSelector";
import StudentPreferences from "./components/StudentPreferences";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { JSX } from "react";

// Tab labels for display
const tabOptionsObject = {
  "my-housing": "My House Search",
  "matches": "Matches",
  "explore": "Explore",
  "profile-and-preferences": "Profile And Preferences",
};

// Components corresponding to each tab
const Components: Record<keyof typeof tabOptionsObject, JSX.Element> = {
  "my-housing": <MyHousingSearch />,
  "matches": <Matches />,
  "explore": <Explore />,
  "profile-and-preferences": (
    <>
      <StudentPreferences />
      <UpcomingEvents />
    </>
  ),
};

const StudentsDashboard = () => {
  const { tab = "profile-and-preferences" } = useParams(); // Default to "my-housing" if no tab is in the URL
  const tabOptions = Object.keys(tabOptionsObject);

  const isValidTab = (value: string): value is keyof typeof Components => {
    return Object.keys(Components).includes(value);
  };

  return (
    <StudentDashboard>
      <div className="my-5">
        <ResponsiveTabSelector {...{ tabOptions, tab, tabOptionsObject }} />
        <div className="mx-5 md:mx-10">
          {isValidTab(tab) ? Components[tab] : <div>Invalid tab</div>}
        </div>
      </div>
    </StudentDashboard>
  );
};

export default StudentsDashboard;
