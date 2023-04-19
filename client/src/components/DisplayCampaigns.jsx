import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns, profilePage }) => {
    const navigate = useNavigate();
    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    };

    return (
        <div className="">
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                {title} ({campaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img
                        className="w-[100px] h-[100px] object-contain"
                        src={loader}
                        alt="loader"
                    />
                )}
                {!isLoading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campaigns yet.
                    </p>
                )}
                {!isLoading && campaigns.length > 0 && (
                    campaigns.reverse().map(
                        (campaign, index) => <FundCard key={index} {...campaign} handleClick={() => handleNavigate(campaign)} profilePage={profilePage} />
                    )
                )}
            </div>
        </div>
    )
}

export default DisplayCampaigns