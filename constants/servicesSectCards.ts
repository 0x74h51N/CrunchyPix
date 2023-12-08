import { CardSections, Icon } from "@/app/common.types";

const createIcon = (type: string): Icon => ({
  type,
  size: 60,
  color: "#dfdfdf",
});

const createCardSection = (
  title: string,
  list: string[],
  iconType: string
): CardSections => ({
  title: title,
  list: list,
  icon: createIcon(iconType),
  tilt: false,
  colorFulBorder: true,
});

export const servicesSectCards: CardSections[] = [
  createCardSection(
    "servicesSect.cards.0.title",
    [
      "servicesSect.cards.0.list.0",
      "servicesSect.cards.0.list.1",
      "servicesSect.cards.0.list.2",
      "servicesSect.cards.0.list.3",
      "servicesSect.cards.0.list.4",
      "servicesSect.cards.0.list.5",
    ],
    "code"
  ),
  createCardSection(
    "servicesSect.cards.1.title",
    [
      "servicesSect.cards.1.list.0",
      "servicesSect.cards.1.list.1",
      "servicesSect.cards.1.list.2",
      "servicesSect.cards.1.list.3",
      "servicesSect.cards.1.list.4",
      "servicesSect.cards.1.list.5",
    ],
    "layout"
  ),
  createCardSection(
    "servicesSect.cards.2.title",
    [
      "servicesSect.cards.2.list.0",
      "servicesSect.cards.2.list.1",
      "servicesSect.cards.2.list.2",
      "servicesSect.cards.2.list.3",
      "servicesSect.cards.2.list.4",
      "servicesSect.cards.2.list.5",
    ],
    "brush"
  ),
  createCardSection(
    "servicesSect.cards.3.title",
    [
      "servicesSect.cards.3.list.0",
      "servicesSect.cards.3.list.1",
      "servicesSect.cards.3.list.2",
      "servicesSect.cards.3.list.3",
      "servicesSect.cards.3.list.4",
      "servicesSect.cards.3.list.5",
    ],
    "chart"
  ),
];
