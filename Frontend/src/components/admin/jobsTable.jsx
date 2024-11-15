import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JobsTable() {
  const navigate = useNavigate();
  const { adminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterSearch] = useState();

  useEffect(() => {
    const filteredJob =
      adminJobs?.length >= 0 &&
      adminJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
    setFilterSearch(filteredJob);
  }, [adminJobs, searchJobByText]);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!adminJobs ? (
            <h1 className="text-2xl font-bold">
              You haven't created any job yet.<span>Create Now</span>
            </h1>
          ) : filterJobs?.length <= 0 ? (
            <h1 className="text-2xl font-bold">No such jobs found.</h1>
          ) : (
            <>
              {filterJobs?.map((job) => {
                return (
                  <tr key={job._id}>
                    <TableCell>{job.company.name}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-white">
                          <div
                            onClick={() => navigate(`get/${job?._id}`)}
                            className="flex items-center gap-2 w-fit cursor-pointer text-gray-600"
                          >
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>
                          <div
                            onClick={() => navigate(`${job?._id}/applicants`)}
                            className="flex items-center gap-2 w-fit cursor-pointer text-gray-600"
                          >
                            <Eye className="w-4" />
                            <span>Applicants</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsTable;
