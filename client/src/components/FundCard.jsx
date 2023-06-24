import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import { useStateContext } from "../context";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
  profilePage,
}) => {
  const { address, secondary, text } = useStateContext();
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className={`sm:w-[288px] w-full rounded-[15px] ${secondary} cursor-pointer`}
      onClick={handleClick}
    >
      <img
        className="w-full h-[158px] object-cover rounded-[15px]"
        src={image}
        alt="campaign"
      />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            className="w-[17px] h-[17px] object-contain"
            src={tagType}
            alt="tag"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Campaign
          </p>
        </div>
        <div className="block">
          <h3
            className={`font-epilogue font-semibold text-[16px] ${text} text-left leading-[26px] truncate`}
          >
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#B2B3BD] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#B2B3BD] leading-[22px]">
              {remainingDays === "-0" ||
              remainingDays === 0 ||
              remainingDays < 0
                ? ""
                : remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {remainingDays === "-0" ||
              remainingDays === 0 ||
              remainingDays < 0
                ? "Campaign over"
                : "Days Left"}
            </p>
          </div>
        </div>
        {!profilePage && (
          <div className="flex items-center mt-[20px] gap-[12px]">
            <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131A]">
              <img
                className="w-1/2 h-1/2 object-contain"
                src={thirdweb}
                alt="user"
              />
            </div>
            <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
              by{" "}
              <span className="text-[#B2B3BD]">
                {owner === address ? "me" : owner}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundCard;
