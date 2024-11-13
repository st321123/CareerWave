import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/login";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetUp from "./components/admin/CompanySetUp";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
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
    path: "/description/:id",
    element: <JobDescription />,
  },

  ////////admin
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetUp />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
]);
function App() {
  return (
    <div className="bg-[#F1F1F2] min-h-screen pb-10">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
