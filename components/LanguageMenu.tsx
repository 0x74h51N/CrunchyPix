import { RootState } from "@/store";
import { langChange } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const LanguageMenu = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    dispatch(langChange(selectedLanguage));

    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <select
      className="bg-transparent text-base text-neutral-200"
      value={currentLanguage}
      onChange={handleChange}
    >
      <option value="en">En</option>
      <option value="de">De</option>
      <option value="tr">Tr</option>
    </select>
  );
};

export default LanguageMenu;
