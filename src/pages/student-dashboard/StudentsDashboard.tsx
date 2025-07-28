import { useState } from "react";
import StudentDashboard from "../../layouts/StudentDashboard.Layout"
import { ResponsiveTabSelector } from "./components/ResponsiveTabSelector"
import { UpcomingEvents } from "./components/UpcomingEvents";
import StudentPreferences from "./components/StudentPreferences";

const StudentsDashboard = () => {
  const tabOptions = ["My Housing Search", "Matches", "Explore", "Profile & Preferences"];
  const [selectedTab, setSelectedTab] = useState(tabOptions[0])

  return (
    <>

      {/* Main Layout */}
      <StudentDashboard>
        <div className="my-5">
          <ResponsiveTabSelector {...{ tabOptions, selectedTab, setSelectedTab }} />
          <div className="mx-5 md:mx-10">
          <StudentPreferences />
          <UpcomingEvents/>
          </div>
        </div>
      </StudentDashboard>
    </>
  )
}

export default StudentsDashboard