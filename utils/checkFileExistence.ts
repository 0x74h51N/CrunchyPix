export const checkFileExistence = async (fileName: string) => {
  try {
    const response = await fetch(`/${fileName}`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
