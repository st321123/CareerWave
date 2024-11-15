import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { applicationUrl } from "@/utils/constants";
import { toast } from "sonner";

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const applicationArray = applicants?.applications;
  const status = ["Accepted", "Rejected"];
  const updateStatus = async (status, Id) => {
    console.log("....", Id);
    try {
      const res = await axios.post(
        `${applicationUrl}/update/status/${Id}`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.message);
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader></TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
        <TableBody>
          {applicationArray.length == 0 ? (
            <h1 className="text-xl font-bold my-10">No Applicants</h1>
          ) : (
            applicationArray.map((item, index) => {
              return (
                <tr key={item?.applicant._id}>
                  <TableCell>{item?.applicant.fullname}</TableCell>
                  <TableCell>{item?.applicant.email}</TableCell>
                  <TableCell>{item?.applicant.phone}</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>
                    {item?.applicant.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-white">
                        {status.map((status, index) => {
                          console.log(item);
                          return (
                            <div
                              key={index}
                              onClick={() => updateStatus(status, item._id)}
                              className="cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
