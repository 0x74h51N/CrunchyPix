import { useState, useEffect } from "react";

const useBlurUrl = (id: string) => {
  const [blurUrl, setBlurUrl] = useState(null);

  useEffect(() => {
    async function fetchBlurUrl() {
      try {
        const res = await fetch(`/api/generate-blur-url?id=${id}`);
        const data = await res.json();
        setBlurUrl(data.blurUrl || "");
      } catch (error) {
        console.error("Failed to fetch blur image URL:", error);
      }
    }

    if (id) {
      setBlurUrl(null)
      fetchBlurUrl();
    }
  }, [id]);

  return blurUrl;
};

export default useBlurUrl;
