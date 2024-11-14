import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { companyUrl } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

function CompanySetUp() {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useGetCompanyById(id);
  const { singleCompany } = useSelector((store) => store.company);
  useEffect(() => {
    setCompanyData({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
    });
  }, [singleCompany]);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${companyUrl}/update/${id}`, companyData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res?.data?.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
            onClick={() => navigate("/admin/companies")}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow bg-white"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={companyData.name}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={companyData.description}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>{" "}
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={companyData.location}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>{" "}
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={companyData.website}
                onChange={changeEventHandler}
                className="rounded"
              />
            </div>
          </div>
          {loading ? (
            <Button
              variant="outline"
              className="rounded-xl bg-[#1995AD] text-white my-10"
            >
              <Loader2 className="animate-spin mr-2 hover:text-black" />
              Please Wait
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-xl bg-[#1995AD] text-white my-10"
              type="submit"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetUp;
