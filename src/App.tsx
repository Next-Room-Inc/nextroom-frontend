import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="">
      {/* Wrap your app with the Redux Provider to pass store */}
      <Provider store={store}>
        {/* Route handling */}
        <RouterProvider router={routes} />
        {/* Toast container for displaying toasts */}
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
