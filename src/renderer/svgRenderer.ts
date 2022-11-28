import { renderHorizontal } from "./quoteCard/cardHorizontal";
import { renderVertical } from "./quoteCard/cardVertical";
import { renderTheme, themes } from "./themes/themeConfig";

export type CardType = "vertical" | "horizontal" | undefined;

export const renderSVG = (
  data: { quote: string; author: string },
  type: CardType,
  theme: keyof typeof themes
) => {
  const { quote, author } = data;

  const color = renderTheme(theme);

  switch (type) {
    case "horizontal":
      return renderHorizontal({ quote, author, color });
    default:
      return renderVertical({ quote, author, color });
  }
};
