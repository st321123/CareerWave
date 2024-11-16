import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchedQuery) {
      const filteredJob = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJob(filteredJob);
    } else {
      setFilterJob(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[10%]">
            <FilterJobs />
          </div>

          {filterJob.length <= 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
                {filterJob.map((item, index) => (
                  <Job key={item._id} job={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
