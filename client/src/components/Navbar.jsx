import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const address = "0xkjh3urhfuey78938786hjfh";

  const connectWallet = () => {

  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Medium & Large Screen Device */}
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1C1C24] rounded-[100px] gap-3">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4B5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4ACD8D] hover:bg-[#089752] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1DC071] hover:bg-[#089752]" : "bg-[#8C6DFD] hover:bg-[#6741f3]"}
          handleClick={() => {
            if (address) navigate("create-campaign")
            else connectWallet()
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2C2F32] hover:bg-[#25282b] transition-all duration-200 flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain hover:scale-125"
            />
          </div>
        </Link>
      </div>

      {/* Small Screen Navbar */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2C2F32] hover:bg-[#25282b] transition-all duration-200 flex justify-center items-center cursor-pointer">
          <img
            src={thirdweb}
            alt="user"
            className="w-[60%] h-[60%] object-contain hover:scale-125"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] hover:scale-105 object-contain cursor-pointer"
          onClick={() => setToggleDrawer(prev => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 rounded-[10px] bg-[#1C1C24] z-10 shadow-secondary py-4 ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"} transition-all duration-700`}
        >
          <ul className="mb-4 px-4">
            {navlinks.map(link => (
              <li
                key={link.name}
                className={`flex items-center p-4 my-2 cursor-pointer rounded-[10px] hover:bg-[#292930] ${isActive === link.name && "bg-[#3A3A43]"}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p className={`ml-[20px] pt-[5px] font-epilogue font-semibold text-[14px] capitalize ${isActive === link.name ? "text-[#1DC071]" : "text-[#808191]"}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1DC071] hover:bg-[#089752]" : "bg-[#8C6DFD] hover:bg-[#6741f3]"}
              handleClick={() => {
                if (address) {
                  navigate("create-campaign");
                  setToggleDrawer(false);
                }
                else connectWallet();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar