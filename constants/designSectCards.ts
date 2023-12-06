import { CardSections, Icon } from "@/app/common.types";

const createCardSection = (title: string, image: string): CardSections => ({
  title: title,
  image: image,
  tilt: false,
  colorFulBorder: false,
});

export const designSectCards: CardSections[] = [
  createCardSection("designSect.cards.0.title", "/responsive.png"),
  createCardSection("designSect.cards.1.title", "/user.png"),
  createCardSection("designSect.cards.2.title", "/animation.png"),
  createCardSection("designSect.cards.3.title", "/perfect.png"),
];
