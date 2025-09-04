
import StudentDashboardLayout from '@src/layouts/StudentDashboard.Layout';
import Dashboard from './components/Dashboard';
import { EventList } from './components/common/EventsList';
import { useGetAllUpcommingEventsQuery, useGetAllUserEventsQuery } from '@src/redux/services/events.service';
import useAuth from '@src/custom-hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth()
  const { data: upcommingEvents = [], isLoading: isUpcommingEventsLoading } = useGetAllUpcommingEventsQuery();
  const { data: userEvents = [], isLoading: isUserEventsLoading } = useGetAllUserEventsQuery(user?.userId || null);

  return (
    <StudentDashboardLayout>
      <div className='mx-5 md:mx-20 pt-15'>
        <Dashboard />

        <EventList
          notRecordFound={<>
            <p className="text-lg font-medium">No upcoming events available right now.</p>
            <p className="text-sm mt-2 text-gray-600">Please check back soon for the latest updates!</p>

          </>
          }
          title="Upcoming Events" events={upcommingEvents} isLoading={isUpcommingEventsLoading} signMeUp={true} />
        <EventList
          notRecordFound={<>
            <p className="text-lg font-medium">You haven’t registered for any events yet.</p>
            <p className="text-sm mt-2">Check out the available events and join one to get started!</p>
          </>}
          title="Confirmed Events" events={userEvents} isLoading={isUserEventsLoading} signMeUp={false} />
      </div>
    </StudentDashboardLayout>
  );
};


export default StudentDashboard;


// const events = [
//   {
//     title: "Nextroom Town Hall",
//     location: "Canadian Tire Centre",
//     image: "/assets/img/events/event_1.png",
//     image_mobile: "/assets/img/events/event_1_mobile.png",
//     date: "03-03-2024",
//   },
//   {
//     title: "Nextroom Town Hall",
//     location: "Canadian Tire Centre",
//     image: "/assets/img/events/event_2.png",
//     image_mobile: "/assets/img/events/event_1_mobile.png",

//     date: "03-03-2024",
//   },
//   {
//     title: "Nextroom Town Hall",
//     location: "Canadian Tire Centre",
//     image: "/assets/img/events/event_3.png",
//     image_mobile: "/assets/img/events/event_1_mobile.png",

//     date: "03-03-2024",
//   },
//   {
//     title: "Nextroom Town Hall",
//     location: "Canadian Tire Centre",
//     image: "/assets/img/events/event_4.png",
//     image_mobile: "/assets/img/events/event_1_mobile.png",

//     date: "03-03-2024",
//   }
// ]