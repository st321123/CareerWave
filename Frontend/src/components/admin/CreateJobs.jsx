import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { jobUrl } from "@/utils/constants";
import axios from "axios";
import { setLoading } from "@/redux/authSlice";

function CreateJobs() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    openings: "",
    companyId: "",
    createdBy: "",
    experience: "",
  });
  const { companies } = useSelector((store) => store.company);

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => {
      return company.name.toLowerCase() == value;
    });
    setJobData({ ...jobData, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${jobUrl}/create`, jobData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center gap-5 p-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold bg-black text-white rounded"
            onClick={() => navigate("/admin/jobs")}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          {/* <h1 className="font-bold text-xl">Company Setup</h1> */}
        </div>
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow bg-white"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={jobData.title}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={jobData.description}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={jobData.requirements}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={jobData.salary}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={jobData.location}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>

            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={jobData.jobType}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Openings</Label>
              <Input
                type="number"
                name="openings"
                value={jobData.openings}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={jobData.experience}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            {
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="bg-white border rounded">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Company</SelectLabel>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          value={company?.name?.toLowerCase()}
                          key={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          </div>

          {loading ? (
            <Button
              variant="outline"
              className="rounded-xl bg-[#1995AD] text-white mt-10"
            >
              <Loader2 className="animate-spin mr-2 hover:text-black" />
              Please Wait
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-xl bg-[#1995AD] text-white mt-10"
              type="submit"
            >
              Post New Job
            </Button>
          )}
          {companies.length == 0 && (
            <h1 className="mt-2 text-red-400">
              Please register a company first.
              <span>
                <Link
                  to="/admin/companies/create"
                  className="text-blue-700 ml-3"
                >
                  Register Now
                </Link>
              </span>
            </h1>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateJobs;
