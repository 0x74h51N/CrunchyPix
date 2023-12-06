import { CardSections, Icon } from "@/app/common.types";

const createIcon = (type: string): Icon => ({
  type,
  size: 60,
  color: "#dfdfdf",
});

export const introductionCards: CardSections[] = [
  {
    title: "introduction.cards.0.title",
    description: "introduction.cards.0.description",
    icon: createIcon("mobile"),
  },
  {
    title: "introduction.cards.1.title",
    description: "introduction.cards.1.description",
    icon: createIcon("code"),
  },
  {
    title: "introduction.cards.2.title",
    description: "introduction.cards.2.description",
    icon: createIcon("paintbrush"),
  },
  {
    title: "introduction.cards.3.title",
    description: "introduction.cards.3.description",
    icon: createIcon("search"),
  },
];
