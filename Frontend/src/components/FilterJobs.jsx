import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Role",
    arr: ["Frontend", "Backend", "FullStack"],
  },
  {
    filterType: "Salary",
    arr: ["0-40K", "41-1lakh", "1lakh-5lakh"],
  },
];

function FilterJobs() {
  useGetAllJobs();
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded">
      <h1 className="font-bold text-lg">FilterJobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="text-lg font-bold">{data.filterType}</h1>
              {data.arr.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default FilterJobs;
