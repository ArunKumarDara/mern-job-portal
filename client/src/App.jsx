import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AdminJobs from "./pages/admin/jobs/AdminJobs";
import Browse from "./pages/user/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/user/JobDescription";
import Companies from "./pages/admin/companies/Companies";
import Jobs from "./pages/user/Jobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
