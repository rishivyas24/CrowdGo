import { Routes, Route } from "react-router-dom";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Navbar, Sidebar } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131A] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000
        }}
      />
    </div>
  )
}

export default App