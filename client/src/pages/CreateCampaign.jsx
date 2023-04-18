import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (e, fieldName) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#1C1C24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3A3A43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="*Your Name"
            placeholder="Shubham Lal"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange(e, "name")}
          />
          <FormField
            labelName="*Campaign Title"
            placeholder="Write a Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange(e, "title")}
          />
        </div>
        <FormField
          labelName="*Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange(e, "description")}
        />
        <div className="flex justify-start items-center p-4 bg-[#8C6DFD] h-[120px] rounded-[10px] w-fit">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount 🚀
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="*Goal"
            placeholder="0.50 ETH"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange(e, "target")}
          />
          <FormField
            labelName="*End Date"
            placeholder="Target Date Deadline"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange(e, "deadline")}
          />
          <FormField
            labelName="*Campaign Image"
            placeholder="Paste image URL of your campaign"
            inputType="text"
            value={form.image}
            handleChange={(e) => handleFormFieldChange(e, "image")}
          />
        </div>

        <div className="flex justify-end items-center mt-[25px]">
          <CustomButton
            btnType="submit"
            title="Submit your campaign"
            styles="bg-[#1DC071] hover:bg-[#089752]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign