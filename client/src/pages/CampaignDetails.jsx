import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { address, contract, donate, getDonations, secondary, text, primary } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);
  const pId = state.pId;

  const fetchDonators = async () => {
    const data = await getDonations(pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(pId, state.owner, amount);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            className="w-full h-[410px] object-cover rounded-xl"
            src={state.image}
            alt="campaign"
          />
          <div className="relative w-full h-[5px] bg-[#9594948a] mt-2">
            <div
              className="absolute h-full bg-[#4ACD8D]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox
            title="Days Left"
            value={
              remainingDays === "-0" || remainingDays === 0 || remainingDays < 0
                ? "End"
                : remainingDays
            }
          />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] ${text}`}>
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
                <h4
                  className={`font-epilogue font-semibold text-[14px] ${text} break-all`}
                >
                  {state.owner === address ? "Campaign by Me" : state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191] break-all">
                  {state.owner !== address ? "Campaign Creator" : state.owner}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] ${text}`}>
              STORY
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] ${text}`}>
              DONATORS
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#B2B3BD] leading-[26px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] text-justify">
                  No Donators yet... Be the first one😊
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <h4 className={`font-epilogue font-semibold text-[18px] ${text}`}>
            FUND
          </h4>
          <div
            className={`mt-[20px] flex flex-col p-4 ${secondary} rounded-[10px]`}
          >
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="0.1 ETH"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3A3A43] 
                bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4B5264] rounded-[10px]"
                value={amount}
                disabled={
                  remainingDays === "-0" ||
                  remainingDays === 0 ||
                  remainingDays < 0
                    ? true
                    : false
                }
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className={`my-[20px] p-4 ${primary} rounded-[10px]`}>
                <h4
                  className={`font-epilogue font-semibold text-[14px] leading-[22px] ${text}`}
                >
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <CustomButton
                btnType="button"
                title={isLoading ? "Funding..." : "Fund Campaign"}
                styles={`w-full  ${
                  remainingDays === "-0" ||
                  remainingDays === 0 ||
                  remainingDays < 0
                    ? `bg-[#67676754] `
                    : `bg-[#8C6DFD] hover:bg-[#6b53c0]`
                }`}
                handleClick={handleDonate}
                isDisabled={
                  remainingDays === "-0" ||
                  remainingDays === 0 ||
                  remainingDays < 0
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
