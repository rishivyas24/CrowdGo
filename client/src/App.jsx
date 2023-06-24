import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateCampaign,
  CampaignDetails,
  Home,
  Profile,
  SearchResults,
} from "./pages";
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./context";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

const App = () => {
  const { primary } = useStateContext();
  return (
    <div className={`relative sm:-8 p-4 ${primary} min-h-screen flex flex-row`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
        <NotificationContainer />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default App;
