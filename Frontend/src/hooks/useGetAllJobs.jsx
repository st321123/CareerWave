import axios from "axios";
import { useEffect } from "react";
import { jobUrl } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${jobUrl}/alljobs?keyword=${searchedQuery || ""}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
