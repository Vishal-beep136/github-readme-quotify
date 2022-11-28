import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchQuotes, QuoteMode } from "../src/data/quotesFetcher";
import { CardType, renderSVG } from "../src/renderer/svgRenderer";
import { themes } from "../src/renderer/themes/themeConfig";

interface ResponseQuery {
  type: CardType;
  theme: keyof typeof themes;
  mode: QuoteMode;
  quote: string;
  author: string;
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const { type, theme, mode, quote, author } =
    req.query as unknown as ResponseQuery;

  let data;

  if (quote && author) data = { quote, author };
  else if (quote) data = { quote, author: "Me" };
  else data = await fetchQuotes(mode);

  // Send the quote image response.
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", `public, max-age=600`);
  res.send(renderSVG(data, type, theme));
};

export default handler;
