import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { companyUrl } from "@/utils/constants";
import { toast } from "sonner";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const onInputChange = (e) => {
    setCompanyName(e.target.value);
  };
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${companyUrl}/register`, companyName, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success();
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            Give your company name? You can change this later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          onChange={(e) => onInputChange}
          type="text"
          className="my-2 rounded"
          placeholder="Google, Microsoft etc."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            className="bg-black text-white rounded-xl"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="rounded-xl bg-[#1995AD] text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
