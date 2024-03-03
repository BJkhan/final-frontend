import { createContext, useContext, useReducer } from "react";

const LanguageContext = createContext();

// Action Types
const SET_LANGUAGE = "SET_LANGUAGE";

const languageReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { 
        ...state,
        language: action.payload,
        direction: action.payload === "ar" ? "rtl" : "ltr",
      };
    default:
      return state;
  }
};

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, { 
    language: "en",
    direction: "ltr"
  });

  const toggleLanguage = (newLanguage) => {
    dispatch({ type: SET_LANGUAGE, payload: newLanguage });
  };

  return (
    <LanguageContext.Provider value={{ ...state, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
