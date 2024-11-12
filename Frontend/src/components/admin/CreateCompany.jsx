import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { companyUrl } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Loader2 } from "lucide-react";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onInputChange = (e) => {
    setCompanyName(e.target.value);
  };
  const registerNewCompany = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${companyUrl}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
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
          value={companyName}
          onChange={onInputChange}
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
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
