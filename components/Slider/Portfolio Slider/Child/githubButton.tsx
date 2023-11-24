import { FaGithub } from "react-icons/fa";

interface GitHubButtonProps {
  githubLink: string;
}

const GitHubButton = ({ githubLink }: GitHubButtonProps) => {
  return (
    <a
      href={githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-auto"
    >
      <FaGithub size={24} color="#ffffff" />
    </a>
  );
};

export default GitHubButton;
