import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterSearch, setFilterSearch] = useState();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterSearch(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companies ? (
            <h1 className="text-2xl font-bold">
              You haven't registered any company yet.<span>Register Now</span>
            </h1>
          ) : filterSearch?.length <= 0 ? (
            <h1 className="text-2xl font-bold">No such company found.</h1>
          ) : (
            <>
              {filterSearch?.map((company) => {
                return (
                  <tr key={company._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          className="h-10"
                          src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-white">
                          <div
                            onClick={() => navigate(`${company?._id}`)}
                            className="flex items-center gap-2 w-fit cursor-pointer text-gray-600"
                          >
                            <Edit2 className="w-4" />
                            <span>Edit</span>
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

export default CompaniesTable;
