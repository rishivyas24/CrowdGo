import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";
import { useStateContext } from "../context";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Icon = ({ styles, imgUrl, name, isActive, disabled, handleClick }) => (
  <div
    className={`${isActive && isActive === name && "bg-[#2C2F32]"} ${
      !disabled && "cursor-pointer"
    } ${styles} w-[48px] h-[48px] rounded-[10px] flex justify-center items-center`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const disconnect = useDisconnect();

  const { address } = useStateContext();

  const { handleMode, secondary } = useStateContext();
  const handleLogout = () => {
    disconnect();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2C2F32]"
          imgUrl={logo}
          handleClick={() => {
            if (!address) {
              NotificationManager.error(
                "Please connect your metamask account first",
                "Wallet Not Connected",
                2000
              );
              return;
            } else {
              navigate("/");
            }
          }}
        />
      </Link>

      <div
        className={`flex-1 flex flex-col justify-between items-center ${secondary} rounded-[20px] w-[76px] py-4 mt-12`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!address) {
                  NotificationManager.error(
                    "Please connect your metamask account first",
                    "Wallet Not Connected",
                    2000
                  );
                  return;
                }
                if (!link.disabled) {
                  setIsActive(link.name);
                  if (link.name === "logout") {
                    handleLogout(); // perform the logout action
                    setIsActive("dashboard");
                  } else {
                    navigate(link.link);
                  }
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles={`${secondary} shadow-secondary`}
          imgUrl={sun}
          handleClick={handleMode}
        />
      </div>
    </div>
  );
};

export default Sidebar;
