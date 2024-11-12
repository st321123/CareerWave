import axios from "axios";
import React, { useEffect } from "react";
import { companyUrl, jobUrl } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function useGetCompanyById(id) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${companyUrl}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [id, dispatch]);
}

export default useGetCompanyById;
