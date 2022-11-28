import axios from "axios";

const baseUrlProgrammingQuote = "https://programming-quotes-api.herokuapp.com";
const baseUrlNormalQuote = "https://api.quotable.io/random";

export type QuoteMode = "programming" | "normal" | "mixed" | undefined;

// this type of quote response should be return no matter which api being used.
interface QuoteResponse {
  quote: string;
  author: string;
}

// expected response from programming quote api
interface ProgrammingQuoteResponse {
  en: string;
  author: string;
}

// expected response from normal quote api
interface NormalQuoteResponse {
  content: string;
  author: string;
}

// converting ProgrammingQuoteResponse to QuoteResponse
const parseProgrammingQuote = (quoteData: ProgrammingQuoteResponse) => {
  return {
    quote: quoteData.en,
    author: quoteData.author,
  };
};

// converting NormalQuote response to QuoteResponse
const parseNormalQuote = (quoteData: NormalQuoteResponse) => {
  return {
    quote: quoteData.content,
    author: quoteData.author,
  };
};

// only fetching programming quote
async function fetchProgrammingQuote(): Promise<QuoteResponse> {
  const response = await axios.get(`${baseUrlProgrammingQuote}/quotes/random`);
  const data = response.data;
  const parsedQuote = parseProgrammingQuote(data);
  return parsedQuote.quote.length < 220 ? parsedQuote : fetchProgrammingQuote();
}

// only fetching normal quote
async function fetchNormalQuote(): Promise<QuoteResponse> {
  const response = await axios.get(`${baseUrlNormalQuote}?maxLength=220`);
  const data = response.data;
  return parseNormalQuote(data);
}

export async function fetchQuotes(
  mode: QuoteMode = "programming"
): Promise<QuoteResponse> {
  // return quote according to quote mode
  // by default programming quotes are returned
  switch (mode) {
    case "normal":
      return await fetchNormalQuote();
    case "mixed": {
      // random number can be 0 or 1
      const randomNum = Math.floor(Math.random() * 2);
      return randomNum == 0
        ? await fetchNormalQuote()
        : await fetchNormalQuote();
    }
    default:
      return await fetchProgrammingQuote();
  }
}
