import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { CountBox, CustomButton } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, contract, getDonations } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);

  return (
    <div>
      {isLoading && "Loading..."}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            className="w-full h-[410px] object-cover rounded-xl"
            src={state.image}
            alt="campaign"
          />
          <div className="relative w-full h-[5px] bg-[#3A3A43] mt-2">
            <div
              className="absolute h-full bg-[#4ACD8D]"
              style={{
                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                maxWidth: "100%"
              }}
            >
            </div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox
            title="Days Left"
            value={remainingDays === "-0" || remainingDays === 0 || remainingDays < 0 ? "End" : remainingDays}
          />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox
            title="Total Backers"
            value={donators.length}
          />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white">
              CREATOR
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2C2F32] cursor-pointer">
                <img
                  className="w-[60%] h-[60%] object-contain"
                  src={thirdweb}
                  alt="user"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner === address ? "Campaign by Me" : state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191] break-all">
                  {state.owner !== address ? "Campaign Creator" : state.owner}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white">
              STORY
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white">
              DONATORS
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((donator, index) => (
                <div>
                  DONATORS
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] text-justify">
                  No Donators yet... Be the first one😊
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails