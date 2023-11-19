export const randomColor = (count: number) => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < count; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
