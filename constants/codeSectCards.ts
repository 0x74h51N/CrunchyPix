import { CardSections, Icon } from "@/app/common.types";

const createIcon = (type: string): Icon => ({
  type,
  size: 80,
  color: "#dfdfdf",
});

const createCardSection = (title: string, iconType: string): CardSections => ({
  title: title,
  icon: createIcon(iconType),
  tilt: false,
  colorFulBorder: false,
});

export const codeSectCards: CardSections[] = [
  createCardSection("codeSect.cards.0.title", "puzzle"),
  createCardSection("codeSect.cards.1.title", "light"),
  createCardSection("codeSect.cards.2.title", "broom"),
  createCardSection("codeSect.cards.3.title", "sync"),
];
