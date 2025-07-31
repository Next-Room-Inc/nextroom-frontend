import { useState } from "react";
import StudentDashboard from "../../layouts/StudentDashboard.Layout"
import { ResponsiveTabSelector } from "./components/ResponsiveTabSelector"
import { UpcomingEvents } from "./components/UpcomingEvents";
import StudentPreferences from "./components/StudentPreferences";
import MyHousingSearch from "./components/MyHousingSearch";
import Matches from "./components/Matches";
import Explore from "./components/Explore";

const StudentsDashboard = () => {
  // const profile = <div className="flex items-center justify-center gap-4">
  //   <img
  //     src="/assets/img/search-property/student_profile (1).png"
  //     alt={"loading..."}
  //     className="w-6 h-6 rounded-full"
  //   />
  //   Profile & Preferences</div>
  const tabOptions = ["My Housing Search", "Matches", "Explore", "Profile & Preferences"];
  const [selectedTab, setSelectedTab] = useState(tabOptions[0])

  
  return (
    <>

      {/* Main Layout */}
      <StudentDashboard>
        <div className="my-5">
          <ResponsiveTabSelector {...{ tabOptions, selectedTab, setSelectedTab }} />
          <div className="mx-5 md:mx-10">
            {selectedTab === tabOptions[0] && <MyHousingSearch/>}
            {selectedTab === tabOptions[1] && <Matches/>}
            {selectedTab === tabOptions[2] && <Explore/>}
            {selectedTab === tabOptions[3] && <><StudentPreferences /> <UpcomingEvents /></>}

          </div>
        </div>
      </StudentDashboard>
    </>
  )
}

export default StudentsDashboard