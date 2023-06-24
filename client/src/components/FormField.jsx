import React from "react";
import { useStateContext } from "../context";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) => {
  const { text } = useStateContext();
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          rows={10}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3A3A43] bg-transparent font-epilogue ${text} text-[14px] placeholder:text-[#4B5264] rounded-[10px] sm:min-w-[300px]`}
        />
      ) : (
        <input
          required
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          step="0.1"
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3A3A43] bg-transparent font-epilogue ${text} text-[14px] placeholder:text-[#4B5264] rounded-[10px] sm:min-w-[300px]`}
        />
      )}
    </label>
  );
};

export default FormField;
