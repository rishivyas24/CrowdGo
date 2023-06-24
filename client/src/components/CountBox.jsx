import React from "react";
import { useStateContext } from "../context";

const CountBox = ({ title, value }) => {
  const { secondary, ternary, text } = useStateContext();
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4
        className={`font-epilogue font-bold text-[30px] ${text} p-3 ${secondary} rounded-t-[10px] w-full text-center truncate`}
      >
        {value}
      </h4>
      <p
        className={`font-epilogue font-normal text-[16px] text-[#808191] ${ternary} px-3 py-2 w-full rounded-b-[10px] text-center`}
      >
        {title}
      </p>
    </div>
  );
};

export default CountBox;
