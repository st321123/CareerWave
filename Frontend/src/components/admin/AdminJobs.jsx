import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import JobsTable from "./jobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";

function AdminJobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useGetAllAdminJobs();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(search));
  }, [search]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex item-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter By Job Title"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outline"
            className=" text-white bg-black rounded-md mb-3 hover:text-black rounded-xl"
            onClick={() => navigate("/admin/job/create")}
          >
            New Job
          </Button>
        </div>
        <JobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
