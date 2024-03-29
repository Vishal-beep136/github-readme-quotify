import axios from "axios";

const baseUrlProgrammingQuote =
  "https://github.com/skolakoda/programming-quotes-api/raw/master/Data/quotes.json";
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

// get random programming quote
const getRandomProgrammingQuote = (
  quotes: ProgrammingQuoteResponse[]
): ProgrammingQuoteResponse => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return randomQuote.en.length < 220
    ? randomQuote
    : getRandomProgrammingQuote(quotes);
};

// only fetching programming quote
async function fetchProgrammingQuote(): Promise<QuoteResponse | null> {
  try {
    const response = await axios.get(baseUrlProgrammingQuote);
    // whole programming quotes list
    const data = response.data;
    const randQuote = getRandomProgrammingQuote(data);
    return parseProgrammingQuote(randQuote);
  } catch (e) {
    console.log(e);
    return null;
  }
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
  const defaultQuote: QuoteResponse = {
    quote: "Something went wrong!",
    author: "Quotify",
  };

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
        : (await fetchProgrammingQuote()) || defaultQuote;
    }
    default:
      return (await fetchProgrammingQuote()) || defaultQuote;
  }
}
