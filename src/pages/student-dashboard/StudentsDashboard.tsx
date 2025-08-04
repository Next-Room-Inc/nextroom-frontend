import { useParams } from "react-router-dom";
import StudentDashboard from "../../layouts/StudentDashboard.Layout";
import Explore from "./components/Explore";
import Matches from "./components/Matches";
import MyHousingSearch from "./components/MyHousingSearch";
import { ResponsiveTabSelector } from "./components/ResponsiveTabSelector";
import StudentPreferences from "./components/StudentPreferences";
import { UpcomingEvents } from "./components/UpcomingEvents";

// Tab labels for display
const tabOptionsObject = {
  "my-housing": "My House Search",
  "matches": "Matches",
  "explore": "Explore",
  "profile-and-preferences": "Profile And Preferences",
};

// Components corresponding to each tab
const Components = {
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
  const { tab = "my-housing" } = useParams(); // Default to "my-housing" if no tab is in the URL
  const tabOptions = Object.keys(tabOptionsObject);

  return (
    <StudentDashboard>
      <div className="my-5">
        <ResponsiveTabSelector {...{ tabOptions, tab, tabOptionsObject }} />
        <div className="mx-5 md:mx-10">
          {Components[tab]}
        </div>
      </div>
    </StudentDashboard>
  );
};

export default StudentsDashboard;
