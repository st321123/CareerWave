import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { applicationUrl } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { setApplicants } from "@/redux/applicationSlice";

function Applicants() {
  const { applicants } = useSelector((store) => store.application);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${applicationUrl}/${id}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold my-5">
          Applicants({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
