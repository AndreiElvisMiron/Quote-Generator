const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show that we are loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with "Annonymous"
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote Length to determine the styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quotes');
    } else {
        quoteText.classList.remove('long-quotes');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl= 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
   
    } catch (error) {
        
        // Catch Error here
    }
}

//Post on Facebook
function facebookQuote() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(facebookUrl, '_blank');
}

function twitterQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
    newQuoteBtn.addEventListener('click', newQuote);
    facebookBtn.addEventListener('click', facebookQuote);
    twitterBtn.addEventListener('click', twitterQuote)

// On load
getQuotes();