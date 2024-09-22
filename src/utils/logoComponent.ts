type LogoType = {
  icon: string;
  text: string;
};

export const LogoComponent = ({ key }: { key: string }) => {
  const normalizedKey = key.toLowerCase().replace(/\./g, '');
  const logo: LogoType = {
    icon: `/crunchypix/logo/${normalizedKey}.svg`,
    text: key,
  };

  return logo;
};
