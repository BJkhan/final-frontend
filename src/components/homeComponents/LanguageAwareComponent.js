// LanguageAwareComponent.js
import React from "react";
import { useLanguage } from "../../components/LanguageContext";

const LanguageAwareComponent = ({ children }) => {
  const { direction } = useLanguage();

  return <div dir={direction}>{children}</div>;
};

export default LanguageAwareComponent;
