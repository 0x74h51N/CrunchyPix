import { useState, useEffect } from "react";

const [isScrolled, setIsScrolled] = useState(false);

const handleScroll = () => {
  if (window.scrollY > 100) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }
};

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
export default handleScroll;
