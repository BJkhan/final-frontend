import React from "react";
import { useLanguage } from "../LanguageContext";

const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    toggleLanguage(newLanguage);
  };

  return (
    <select
      className="form-select mb-1 mx-3"
      aria-label="Default select example"
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSelector;
