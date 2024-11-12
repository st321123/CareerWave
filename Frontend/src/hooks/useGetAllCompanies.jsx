import axios from "axios";
import React, { useEffect } from "react";
import { companyUrl } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllCompany } from "@/redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${companyUrl}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllCompany(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompany();
  }, []);
}

export default useGetAllCompanies;
