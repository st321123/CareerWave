import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import JobsTable from "./jobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";

function AdminJobs() {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  const dispatch = useDispatch();
  const allAdminJobs = useSelector((store) => store.job);
  useEffect(() => {
    dispatch(setAllAdminJobs(allAdminJobs));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex item-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="filter by company name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outline"
            className=" text-white bg-black rounded-md mb-3 hover:text-black rounded-xl"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Jobs
          </Button>
        </div>
        <JobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
