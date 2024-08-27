import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/jobs",
    element: (
      <>
        <Navbar />
        <Job />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
]);

function App() {
  return (
    <div className="md:ml-10 md:mr-10 ml-5 mr-5">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
