import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobs() {
  const { appliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="font-bold text-lg">
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length == 0 ? (
            <span>You haven't applied any job yet.</span>
          ) : (
            appliedJobs.map((item, index) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{item.job.title}</TableCell>
                  <TableCell>{item.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    {item.status == "Accepted" ? (
                      <Badge className="text-green-600">{item.status}</Badge>
                    ) : item.status == "Rejected" ? (
                      <Badge className="text-red-600">{item.status}</Badge>
                    ) : (
                      <Badge className="text-yellow-600">{item.status}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobs;
