interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  const labelColors: Record<string, string> = {
    TypeScript: "#007ACC",
    JavaScript: "#F0DB4F",
    Solidity: "#b6ff7e",
    CSS: "#1572B6",
    HTML: "#E44D26",
    React: "#61DAFB",
    "Next.js": "#ffffff",
    Tailwind: "#38B2AC",
    Bootstrap: "#7952B3",
    Redux: "#764ABC",
    i18next: "#1781FC",
    "Node.js": "#8CC84B",
    Hardhat: "#E0E700",
    Wagmi: "#FF3388",
  };

  const color = labelColors[text] || "#FFFFFF";

  return (
    <span style={{ color }} className={`mr-1 text-[10px]`}>
      {text}
    </span>
  );
};

export default Label;
