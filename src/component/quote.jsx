/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaTwitter, FaTumblr } from "react-icons/fa";
import "./quote.css";

const Quote = () => {
  const [colors] = useState([
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ]);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const [quotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchData = async () => {
    const response = await axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .catch((err) => console.log("err"));

    const dataQuotes = response.data.quotes;

    //pushing quotes
    dataQuotes.forEach((q) => {
      quotes.push(q.quote);
    });

    let currentQuote =
      dataQuotes[Math.floor(Math.random() * dataQuotes.length)];
    setAuthor(currentQuote.author);
    setQuote(currentQuote.quote);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="quote_container"
      style={{ backgroundColor: `${randomColor}` }}
    >
      <div className="quote" style={{ color: `${randomColor}` }}>
        <div className="current_quote">
          <h2>
            <FaQuoteLeft style={{ marginRight: ".8rem" }} />
            {quote}
          </h2>
          <div className="author">- {author}</div>
        </div>
        <div className="footer">
          <div className="share_links">
            <div
              className="icon"
              style={{
                backgroundColor: `${randomColor}`,
                color: "white",
                fontSize: "1rem",
              }}
            >
              <FaTwitter />
            </div>
            <div
              className="icon"
              style={{
                backgroundColor: `${randomColor}`,
                color: "white",
                fontSize: "1rem",
              }}
            >
              <FaTumblr />
            </div>
          </div>
          <div className="btn">
            <button
              style={{
                backgroundColor: `${randomColor}`,
              }}
              onClick={fetchData}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
