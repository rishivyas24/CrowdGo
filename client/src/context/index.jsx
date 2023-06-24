import { useContext, createContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x803170Cd6cF84a148e34488BEE50cd3a6D2D1a6A"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const [primary, setPrimary] = useState(
    "bg-[#131313] transition ease-in-out duration-300"
  );
  const [secondary, setSecondary] = useState(
    "bg-[#1C1C24] transition ease-in-out duration-300"
  );
  const [ternary, setTernary] = useState(
    "bg-[#28282E] transition ease-in-out duration-300"
  );
  const [text, setText] = useState(
    "text-white transition ease-in-out duration-300"
  );

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.log("Contract Call Success", data);
    } catch (error) {
      console.log("Contract Call Failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, index) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: index,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, owner, amount) => {
    const data = await contract.call("donateToCampaign", [pId, owner], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const handleMode = () => {
    if (primary === "bg-[#131313] transition ease-in-out duration-300") {
      setPrimary("bg-[#f1f1f1] transition ease-in-out duration-300");
      setSecondary("bg-[#d3d3d38a] transition ease-in-out duration-300");
      setTernary("bg-[#d1d1d1] transition ease-in-out duration-300");
      setText("text-black transition ease-in-out duration-300");
    } else {
      setPrimary("bg-[#131313] transition ease-in-out duration-300");
      setSecondary("bg-[#1C1C24] transition ease-in-out duration-300");
      setTernary("bg-[#28282E] transition ease-in-out duration-300");
      setText("text-white transition ease-in-out duration-300");
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        primary,
        secondary,
        ternary,
        text,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        handleMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
