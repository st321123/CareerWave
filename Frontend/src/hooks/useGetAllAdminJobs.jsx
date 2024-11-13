import axios from "axios";
import React, { useEffect } from "react";
import { jobUrl } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${jobUrl}/adminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
}

export default useGetAllAdminJobs;
