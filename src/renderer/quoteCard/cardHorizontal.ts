import { poppinsFontSVG, QuoteDataProp } from "../constants";

export const renderHorizontal = ({ quote, author, color }: QuoteDataProp) => {
  const renderedSVG = `
  <svg width="600" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            ${poppinsFontSVG}

            <style>
                * {
                  padding: 0;
                  margin: 0;
                  box-sizing: border-box;
                }
                .container {
                  font-family: Poppins, Arial, Helvetica, sans-serif;
                  width: 600px;
                  background-color: #${color.background};
                  border-radius: 10px;
                }
                .container h3 {
                  font-size: 19px;
                  margin:5px;
                  font-weight: 500;
                  font-style: oblique;
                  text-align: center;
                  color: #${color.quote};
                }

                blockquote {
                  display: inline-block;
                  border:none;
                  font-family:Georgia, "Times New Roman", Times, serif;
                  quotes: "“";
                }
                            
                blockquote h3:before { 
                  content: open-quote;
                  font-weight: bold;
                  font-size: 60px;
                  color: #${color.symbol};
                } 
                .container p {
                  font-style: italic;
                  padding: 5px;
                  text-align: right;
                  color: #${color.author};
                  margin:5px;
                }
            </style>

            <div class="container">
                <blockquote><h3> ${quote}</h3></blockquote>
                <p>- ${author}</p>
            </div>
        </div>
    </foreignObject>
  </svg>
`;

  return renderedSVG;
};
