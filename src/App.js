import React, {useEffect, useState} from "react";
import './App.scss';
import COLORS_ARRAY from "./colorsArray";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {faQuoteRight} from '@fortawesome/free-solid-svg-icons';

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.");
  const [author, setAuthor] = useState("Erma Bombeck");
  const[quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response =  await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  } 

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
   }, [])


const getRandomQuote = () => {
  let randomInteger = Math.floor(quotesArray.length * Math.random())
  setAccentColor(COLORS_ARRAY[randomInteger])
  setQuote(quotesArray[randomInteger].quote)
  setAuthor(quotesArray[randomInteger].author)

}

  return (
    <div className="App">
      <header className="App-header" style={
       {backgroundColor: accentColor}
      }>
       <div id="quote-box" style={{color: accentColor}}>
        <p id="text">
        <FontAwesomeIcon icon={faQuoteLeft} /> {quote} <FontAwesomeIcon icon={faQuoteRight} />
        </p>
        <p id="author">- {author}
        </p>
        <div className="button">
        <a id="tweet-quote" style={
      {backgroundColor: accentColor}} 
       href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
      <FontAwesomeIcon icon={faXTwitter} />
      </a>
      </div>  
        
        <button id="new-quote" style={
       {backgroundColor: accentColor}
      } onClick={() => 
        getRandomQuote()
        }>Change Quote</button>
        </div>
        <div className="creator">
          <p>
           by Antoine Ghsoub
          </p>
        </div>
      </header>
    </div>
  );
      }

export default App;
