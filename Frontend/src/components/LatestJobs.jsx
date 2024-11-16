import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#1995AD]">Latest & Top </span>Job openings...
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5 ">
        {allJobs.length ? (
          allJobs.slice(0, 6).map((item) => {
            return <JobCard key={item._id} job={item} />;
          })
        ) : (
          <span>No Jobs Available</span>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
