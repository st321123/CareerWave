import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(search));
  }, [search]);
  useGetAllCompanies();
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
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
